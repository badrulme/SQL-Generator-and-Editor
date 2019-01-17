import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

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
  parameterLists = '';
  parameterName = '';

  constructor() { }

  ngOnInit() {
  }

  generateQuery() {
    if (this.inputUserQuery !== '') {
      this.processedUserQuery = '';
      this.parameterLists = '';
      this.parameterName = '';
      this.splitUserQuery = this.inputUserQuery.trim().toUpperCase().split('\n');
      for (const sp of this.splitUserQuery) {
        if (sp !== '') {
          if (sp.indexOf('--') === 0) {
            this.processedUserQuery = this.processedUserQuery + sp.replace('--', '//') + '\n';
          } else {
            if (sp.indexOf('SQL.APPEND(" ') === 0 || sp.indexOf('//') === 0) {
              if (sp.indexOf('//') === 0) {
                this.processedUserQuery = this.processedUserQuery + sp.replace('//', '--') + '\n';
              } else {
                this.processedUserQuery = this.processedUserQuery + sp.substring(13, sp.indexOf('");')) + '\n';

              }
              this.sqlInputType = 'J';
              this.sqlOutputType = 'S';
            } else {
              // if (sp.substring(13, sp.indexOf('");')).indexOf(':') > 0) {
              if (sp.indexOf(':') === 0 && sp.length > 1) {
                // if (this.parameterLists === '') {
                //   this.parameterLists = 'Map<String, Object> params = new HashMap<>();\n';
                // }
                const parameterNameInCamelCase = sp.substring(1).split('_');
                let x = 0;
                for (const prm of parameterNameInCamelCase) {
                  if (x === 0) {
                    this.parameterName = prm.toLowerCase();
                  } else {
                    // this.parameterName += prm.toUpperCase();
                    this.parameterName += prm.substr(0, 1).toUpperCase() + prm.substr(1).toLowerCase();
                  }
                  x++;
                }
                // tslint:disable-next-line:max-line-length
                this.parameterLists += 'params.put("' + sp.replace(',', '').replace(':', '').replace(/\s/g, '').replace(')', '') + '", ' + this.parameterName.replace(',', '').replace(/\s/g, '').replace(')', '') + '); \n';
              }
              // }
              this.processedUserQuery = this.processedUserQuery + 'sql.append(" ' + sp + '");\n';
              this.sqlInputType = 'S';
              this.sqlOutputType = 'J';
            }
          }
        } else {
          this.processedUserQuery = this.processedUserQuery + '\n';
        }
      }
      if (this.parameterLists !== '') {
        this.processedUserQuery = this.processedUserQuery + 'Map<String, Object> params = new HashMap<>();\n' + this.parameterLists;
      }
    } else {
      this.processedUserQuery = '';
    }
  }


  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
