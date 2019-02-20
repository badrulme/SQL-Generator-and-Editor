import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SQL Generator and Editor';
  baseApiUrl = 'http://localhost:8484';
  // baseApiUrl = 'http://192.168.111.11:8484';
}
