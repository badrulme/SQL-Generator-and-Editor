import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-script-runner',
  templateUrl: './script-runner.component.html',
  styleUrls: ['./script-runner.component.css']
})
export class ScriptRunnerComponent implements OnInit {
  schemaLists: any;
  userScripts = '';
  scriptRunnerResponse = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getChemaLists();
  }
  // scriptRunner(sc) {
  //   //   return this.http.get<string>(`http://localhost:4200/run-script`, sc);
  //   return this.http.get('http://localhost:8484/run-script', sc);
  // }
  // Script Run Method
  // scriptRunner() {
  //   this.scriptRunnerService.scriptRunner('badrul').toPromise();
  // }

  getChemaLists(): any {
    this.http.get(`http://localhost:8484/get-dabase-info`, {
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
      this.http.post(`http://localhost:8484/run-script`, userScripts, { responseType: 'text' }).subscribe(
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

