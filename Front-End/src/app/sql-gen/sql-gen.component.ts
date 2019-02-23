import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../app.config';

@Component({
  selector: 'app-sql-gen',
  templateUrl: './sql-gen.component.html',
  styleUrls: ['./sql-gen.component.css']
})
export class SqlGenComponent implements OnInit {


  inputUserSql = '';
  insertStatementSql = '';
  updateStatementSql = '';
  deleteStatementSql = '';
  allStatementSql = '';
  tableName = '';
  splitSql: any = '';
  i = 1;
  sqlType = 'S';
  columnFlag = 0;
  columnNameList = '';
  inputSequence = '';
  insertSqlScript = '';
  splitColumn: any = '';
  insertColumnList = '';
  insertParameterList = '';
  updateColumnList = '';
  pkColumnName = '';
  paramsName: any = '';
  paramsList = '';
  paramsNameInCamelCase = '';
  paramsNameInCamelCasePk = '';
  hasTableName: any = '';
  isHasTable = false;
  tableNameListFromApi: any = '';
  selectedTableNameFromApi = '';
  columnNameListFromApi: any = '';
  selectedColumnNameListFromModal: String[] = [];
  displayColumnList = '';


  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  objectIdentify() {
    if (this.inputUserSql === '') {
      this.insertStatementSql = '';
      this.updateStatementSql = '';
      this.deleteStatementSql = '';
    }
    this.columnNameList = '';
    this.i = 1;
    this.columnFlag = 0;
    // replace(/(\r\n|\n|\r)/gm, ' '); used for remove new line
    // replace(/\s\s+/g, ' '); used for remove multispace
    this.splitSql = this.inputUserSql.trim().replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s\s+/g, ' ').toUpperCase().split(' ');
    for (const st of this.splitSql) {
      if (this.i < 3) {
        this.tableName = '';
        this.inputSequence = '';
      }
      if (st !== '') {
        // Identify Table Name
        if (this.i === 3) {
          if (st.indexOf('(') > 0) {
            const indexOfBracket: number = st.indexOf('(');
            this.tableName = st.substring(0, indexOfBracket);
            // Identifying Columns
            if (st.indexOf(')') > 0) {
              this.columnNameList = st.substring(indexOfBracket + 1, st.indexOf(')'));
              this.columnFlag = 1;
            } else {
              this.columnNameList = st.substring(indexOfBracket + 1);
            }
          } else {
            this.tableName = st;
          }
        }

        // Identifying Columns
        if (this.i > 3 && this.columnFlag === 0) {

          if (st.indexOf(')') === 0) {
            this.columnFlag = 1;
          } else if (st.indexOf(')') > 0) {
            const indexOfBracket: number = st.indexOf(')');
            if (st.indexOf('(') === 0) {
              this.columnNameList += st.substring(1, indexOfBracket);
            } else {
              this.columnNameList += st.substring(0, indexOfBracket);
            }
            this.columnFlag = 1;
          } else {
            if (st.indexOf('(') === 0) {
              this.columnNameList += st.substring(1);
            } else {
              this.columnNameList += st;
            }
          }
        }

        // Identifying Sequence
        if (st.indexOf('.NEXTVAL') > 0) {
          if (st.indexOf('(') === 0) {
            this.inputSequence = st.substring(1);
          } else {
            this.inputSequence = st.substring(0);
          }
          const indexOfComma: number = this.inputSequence.indexOf(',');
          if (indexOfComma > 0) {
            this.inputSequence = this.inputSequence.substring(0, indexOfComma);
          }
        }
      }
      this.i++;
    }
    // console.log(this.splitSql);
    if (this.tableName.length > 0) {
      // alert(this.tableName);
      this.gethasTable();
      this.getHasColumn();
    }

  }

  generateSqlStatement() {
    this.insertStatementSql = '';
    this.updateStatementSql = '';
    this.deleteStatementSql = '';
    this.allStatementSql = '';
    this.paramsName = '';
    this.paramsList = '';
    this.objectIdentify();
    if (this.columnNameList !== '' || this.tableName !== '') {
      this.splitColumn = this.columnNameList.split(',');
      this.updateColumnList = '';
      this.insertParameterList = '';
      this.insertColumnList = '';

      // Generate Insert Column Lists and Parameter Lists For Insert Statement
      let j = 0;
      for (const cl of this.splitColumn) {
        if (j === 0) {
          if (this.sqlType === 'S') {
            this.insertColumnList = cl;
          } else {
            this.insertColumnList = 'sql.append(" ' + cl;
          }
          this.pkColumnName = cl;

          this.paramsNameInCamelCasePk = this.snakeCaseToCamelCase(cl);
          if (this.inputSequence === '') {
            this.insertParameterList = 'S_' + this.tableName + '.NEXTVAL';
          } else {
            this.insertParameterList = this.inputSequence;
          }
          // if (this.sqlType === 'J') {
          //   this.insertParameterList = this.insertParameterList + '");';
          // }
        } else {
          if (this.sqlType === 'S') {
            this.insertColumnList += ',\n' + cl;
          } else {
            this.insertColumnList += ',");\n' + 'sql.append(" ' + cl;
          }
          if (this.sqlType === 'S') {
            this.insertParameterList += ',\n:' + cl;
          } else {
            this.insertParameterList += ',");\n' + 'sql.append(" :' + cl;
            this.paramsNameInCamelCase = this.snakeCaseToCamelCase(cl);
            this.paramsList += 'params.put("' + cl + '", ' + this.paramsNameInCamelCase + ');\n';
          }
          if (this.sqlType === 'S') {
            // tslint:disable-next-line:max-line-length
            this.updateColumnList += cl.replace('SS_CREATOR', 'SS_MODIFIER') + ' = :' + cl.replace('SS_CREATOR', 'SS_MODIFIER') + ',\n';
          } else {
            // tslint:disable-next-line:max-line-length
            this.updateColumnList = this.updateColumnList + 'sql.append(" ' + cl.replace('SS_CREATOR', 'SS_MODIFIER') + ' = :' + cl.replace('SS_CREATOR', 'SS_MODIFIER') + ',");\n';
          }
        }
        j++;
      }
      // Check SQL Type
      if (this.sqlType === 'S') {
        // Generate Insert Statement For SQL
        // tslint:disable-next-line:max-line-length
        this.insertStatementSql = '-- INSERT STATEMENT FOR ' + this.tableName + '\nINSERT INTO ' + this.tableName + ' (\n' + this.insertColumnList
          + ' )\n' + 'VALUES ( ' + this.insertParameterList + ' )';

        // Generate Update Statement For SQL
        this.updateColumnList = this.updateColumnList.substring(0, this.updateColumnList.length - 2);
        // tslint:disable-next-line:max-line-length
        this.updateStatementSql = '-- UPDATE STATEMENT FOR ' + this.tableName + '\nUPDATE ' + this.tableName + ' SET \n' + this.updateColumnList + '\nWHERE ' + this.pkColumnName + ' = :' + this.pkColumnName;

        // Generate Delete Statement For SQL
        // tslint:disable-next-line:max-line-length
        this.deleteStatementSql = '-- DELETE STATEMENT FOR ' + this.tableName + '\nDELETE FROM ' + this.tableName + ' WHERE ' + this.pkColumnName + ' = :' + this.pkColumnName;
        this.allStatementSql = this.insertStatementSql + '\n\n' + this.updateStatementSql + '\n\n' + this.deleteStatementSql;
      } else {
        // Generate Insert Statement For Java - SQL
        // tslint:disable-next-line:max-line-length
        this.insertStatementSql = '// INSERT STATEMENT FOR ' + this.tableName + '\nsql.append(" INSERT INTO ' + this.tableName + ' (");\n' + this.insertColumnList
          + '");\n' + 'sql.append(" VALUES ( ' + this.insertParameterList + ' )");\n' +
          '\nMap<String, Object> params = new HashMap<>();\n' + this.paramsList;

        // Generate Update Statement For Java - SQL
        this.updateColumnList = this.updateColumnList.substring(0, this.updateColumnList.length - 2);
        // tslint:disable-next-line:max-line-length
        this.updateStatementSql = '// UPDATE STATEMENT FOR ' + this.tableName + '\nsql.append(" UPDATE ' + this.tableName + ' SET");\n' + this.updateColumnList + '\nsql.append(" WHERE ' + this.pkColumnName + ' = :' + this.pkColumnName + '");\n' +
          // tslint:disable-next-line:max-line-length
          '\nMap<String, Object> params = new HashMap<>();\n' + this.paramsList +
          'params.put("' + this.pkColumnName + '", ' + this.paramsNameInCamelCasePk + ');';

        // Generate Delete Statement For SQL
        // tslint:disable-next-line:max-line-length
        this.deleteStatementSql = '// DELETE STATEMENT FOR ' + this.tableName + '\nsql.append(" DELETE FROM ' + this.tableName + ' WHERE ' + this.pkColumnName + ' = :' + this.pkColumnName + '");\n' + '\nMap<String, Object> params = new HashMap<>();\n' + 'params.put("' + this.pkColumnName + '", ' + this.paramsNameInCamelCasePk + ');';
        this.allStatementSql = this.insertStatementSql + '\n\n' + this.updateStatementSql + '\n\n' + this.deleteStatementSql;
      }
    }
  }

  /* snake case to camel case */
  // tslint:disable-next-line:max-line-length
  snakeCaseToCamelCase = input => input.split('_').reduce((res, word, i) => i === 0 ? word.toLowerCase() : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`, '');

  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  // API Calling
  gethasTable(): any {
    // this.http.get(`http://192.168.111.11:8484/get-dabase-info`, {
    this.http.get(`${apiConfig.apiBaseUrl}/get-has-table`, {
      observe: 'response', params: {
        tableName: this.tableName
      }
    })
      .toPromise()
      .then(response => {
        this.hasTableName = response.body;
        for (const sc of this.hasTableName) {
          if (sc === null) {
            alert('null');
          }
          if (sc.HASTABLE === 1) {
            this.isHasTable = true;
          } else {
            this.isHasTable = false;
          }
        }
      })
      .catch(console.log);
  }

  getHasColumn(): any {
    let isHasColumn: any;
    const splitColumnForCheckingFromDatabse = this.columnNameList.trim().split(',');
    for (const cl of splitColumnForCheckingFromDatabse) {
      this.http.get(`${apiConfig.apiBaseUrl}/get-hash-column-name`,
        { observe: 'response', params: { tableName: this.tableName, columnName: cl } }
      ).toPromise().then(response => { isHasColumn = response.body; }).catch(console.log);
      if (isHasColumn.HAS_COLUMN_NAME = 1) {
        this.displayColumnList += '<span>{{cl}}</span>';
      } else {
        this.displayColumnList += '<span class="text-danger">{{cl}}</span>';
      }
    }
  }
  // Modal API calling

  onClickGetTableList(): any {
    this.tableNameListFromApi = '';
    this.http.get(`${apiConfig.apiBaseUrl}/get-table-list`, {
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.tableNameListFromApi = response.body;
      })
      .catch(console.log);
  }

  onChangeGetColumnList(): any {
    this.selectedColumnNameListFromModal = [];
    this.http.get(`${apiConfig.apiBaseUrl}/get-column-list`, {
      observe: 'response', params: {
        tableName: this.selectedTableNameFromApi
      }
    })
      .toPromise()
      .then(response => {
        this.columnNameListFromApi = response.body;
      })
      .catch(console.log);
  }

  // Make an array for All column list
  onClickAddAllColumnListToArray(): any {
    for (const cl of this.columnNameListFromApi) {
      this.selectedColumnNameListFromModal.push(cl.COLUMN_NAME);
    }
    this.columnNameListFromApi.splice(0);
  }

  // Make an array for All column list
  onClickRemoveAllColumnListFromArray(): any {

    for (const cl of this.selectedColumnNameListFromModal) {
      this.columnNameListFromApi.push({ COLUMN_NAME: cl });
    }
    this.selectedColumnNameListFromModal.splice(0);
  }

  // Make an array for selected column list
  onClickAddColumnListToArray(cl, i): any {
    this.selectedColumnNameListFromModal.push(cl);
    this.columnNameListFromApi.splice(i, 1);
  }

  // Delete element from selected array list
  onClickRemoveColumnListFromArray(cl, i): any {
    this.columnNameListFromApi.push({ COLUMN_NAME: cl });
    this.selectedColumnNameListFromModal.splice(i, 1);
  }

  // Generate SQL from Query Builder
  makeSqlInsertColumnListFromSelectedColumn() {
    if (this.selectedColumnNameListFromModal.length > 0) {
      let selectedColumnlList = '';
      for (const cl of this.selectedColumnNameListFromModal) {
        selectedColumnlList += cl + ', ';
      }
      selectedColumnlList = selectedColumnlList.replace(/,\s*$/, '');
      this.inputUserSql = 'INSERT INTO ' + this.selectedTableNameFromApi + '(' + selectedColumnlList + ')';
      this.generateSqlStatement();
      this.selectedTableNameFromApi = '';
      this.selectedColumnNameListFromModal.splice(0);
    }
  }
}


