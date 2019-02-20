import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../app.config';

@Component({
  selector: 'app-script-runner',
  templateUrl: './script-runner.component.html',
  styleUrls: ['./script-runner.component.css']
})
export class ScriptRunnerComponent implements OnInit {
  schemaLists: any;
  userScripts = '';
  scriptRunnerResponse = '';
  scriptRunApiUrl = 'http://localhost:8484';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getChemaLists();
  }

  getChemaLists(): any {
    this.http.get(`${apiConfig.apiBaseUrl}/get-dabase-info`, {
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.schemaLists = response.body;
      })
      .catch(console.log);
  }

  onClickRunScript(userScripts) {
    if (userScripts !== null) {
      this.http.post(`${this.scriptRunApiUrl}/run-script`, userScripts, { responseType: 'text' }).subscribe(
        res => {
          this.scriptRunnerResponse = res;
          console.log(res);
          // alert('Successfully Execute.');
        },
        err => {
          // console.log('Error occured');
          this.displayError(err);
          if (err.text === 'Success') {
            // alert('Successfully Execute');
            console.log(err.text);
          } else {
            console.log(err.text);
          }
        }
      );
      // console.log(userScripts);
    }

  }

  private displayError(ex): void {
    console.log(ex);
  }
}

