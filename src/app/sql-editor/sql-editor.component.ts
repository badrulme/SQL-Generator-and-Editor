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
                this.processedUserQuery = this.processedUserQuery + sp.replace('//', '--') + '\n';
              } else {
                this.processedUserQuery = this.processedUserQuery + sp.substring(13, sp.indexOf('");')) + '\n';
              }
              this.sqlInputType = 'J';
              this.sqlOutputType = 'S';
            } else {
              this.processedUserQuery = this.processedUserQuery + 'sql.append(" ' + sp + '");\n';
              this.sqlInputType = 'S';
              this.sqlOutputType = 'J';
            }
          }
        } else {
          this.processedUserQuery = this.processedUserQuery + '\n';
        }
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
