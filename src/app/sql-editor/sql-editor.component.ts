import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sql-editor',
  templateUrl: './sql-editor.component.html',
  styleUrls: ['./sql-editor.component.css']
})
export class SqlEditorComponent implements OnInit {

  inputUserQuery = '';
  processedUserQuery = '';
  splitUserQuery: any = '';
  sqlInputType = 'S';
  sqlOutputType = 'J';

  constructor() { }

  ngOnInit() {
  }

  generateQuery() {
    if (this.inputUserQuery !== '') {

      this.processedUserQuery = '';
      this.splitUserQuery = this.inputUserQuery.trim().toUpperCase().split('\n');
      for (const sp of this.splitUserQuery) {
        if (sp !== '') {
          if (sp.indexOf('--') === 0) {
            this.processedUserQuery = this.processedUserQuery + sp.replace('--', '//') + '\n';
          } else {
            if (sp.indexOf('SQL.APPEND(" ') === 0 || sp.indexOf('//') === 0) {
              if (sp.indexOf('//') === 0) {
                this.processedUserQuery += sp.replace('//', '--') + '\n';
              } else {
                this.processedUserQuery += sp.substring(13, sp.indexOf('");')) + '\n';
              }
              this.sqlInputType = 'J';
              this.sqlOutputType = 'S';
            } else {
              this.processedUserQuery += 'sql.append(" ' + sp + '");\n';
              this.sqlInputType = 'S';
              this.sqlOutputType = 'J';
            }
          }
        } else {
          this.processedUserQuery += '\n';
        }
      }
      if (this.sqlInputType === 'S' && this.sqlOutputType === 'J') {
        this.processedUserQuery += this.generateParams();
      }

    } else {
      this.processedUserQuery = '';
    }
  }

  generateParams() {
    let indexOfSemiclone = 0;
    let indexOfEndParams = 0;
    let paramsName = '';
    let putInputUserQuery = this.inputUserQuery.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s\s+/g, ' ').trim();

    if (putInputUserQuery.lastIndexOf(' ') + 1 <= putInputUserQuery.length) {
      putInputUserQuery = putInputUserQuery + ' ';
    } else {
      putInputUserQuery = putInputUserQuery;
    }

    while (indexOfSemiclone >= 0) {
      indexOfSemiclone = putInputUserQuery.indexOf(':', indexOfSemiclone + 1);
      if (indexOfSemiclone > 0) {
        indexOfEndParams = putInputUserQuery.indexOf(' ', indexOfSemiclone);
      }
      if (indexOfSemiclone > 0 && indexOfEndParams > 0) {
        // tslint:disable-next-line:max-line-length
        paramsName += 'params.put("' + putInputUserQuery.substring(indexOfSemiclone + 1, indexOfEndParams).replace(',', '') + '", ' + this.snakeCaseToCamelCase(putInputUserQuery.substring(indexOfSemiclone + 1, indexOfEndParams)) + ');\n';

        // console.log(': ' + `${indexOfSemiclone + 1}` + ' end ' + indexOfEndParams);
        // console.log(putInputUserQuery.substring(indexOfSemiclone + 1, indexOfEndParams).replace(',', ''));
        // console.log('final: ' + paramsName);
      }
    }
    if (paramsName === '') {
      return '';
    } else {
      return '\nMap<String, Object> params = new HashMap<>();\n' + paramsName;
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
}
