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
      for (let sp of this.splitUserQuery) {
        sp = sp.trim();
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
      let space = 0;
      let comma = 0;
      let equal = 0;

      if (indexOfSemiclone > 0) {
        space = putInputUserQuery.indexOf(' ', indexOfSemiclone);
        comma = putInputUserQuery.indexOf(',', indexOfSemiclone);
        equal = putInputUserQuery.indexOf('=', indexOfSemiclone);

        if (space === -1) { space = 9999999999; }
        if (comma === -1) { comma = 9999999999; }
        if (equal === -1) { equal = 9999999999; }

        if (space < comma && space < equal) {
          indexOfEndParams = space;
        } else if (comma < equal && comma < space) {
          indexOfEndParams = comma;
        } else if (equal < space && equal < comma) {
          indexOfEndParams = equal;
        }

      }
      if (indexOfSemiclone > 0 && indexOfEndParams > 0 && indexOfEndParams !== 9999999999
        && paramsName.indexOf(putInputUserQuery.substring(indexOfSemiclone + 1, indexOfEndParams).replace(',', '')) === -1) {
        // tslint:disable-next-line:max-line-length
        paramsName += 'params.put("' + putInputUserQuery.substring(indexOfSemiclone + 1, indexOfEndParams).replace(',', '').replace(')', '') + '", ' + this.snakeCaseToCamelCase(putInputUserQuery.substring(indexOfSemiclone + 1, indexOfEndParams).replace(')', '')) + ');\n';

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
