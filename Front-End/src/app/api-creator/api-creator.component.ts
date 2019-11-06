import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../app.config';

@Component({
  selector: 'app-api-creator',
  templateUrl: './api-creator.component.html',
  styleUrls: ['./api-creator.component.css']
})
export class ApiCreatorComponent implements OnInit {
  public tableNameListFromApi;
  public javaModal;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  

  onClickGetTableList(): any {
    // this.modalOpen = true;
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
}
