import { Component, OnInit } from '@angular/core';
import { ScriptRunnerService } from '../service/data/script-runner.service';


@Component({
  selector: 'app-script-runner',
  templateUrl: './script-runner.component.html',
  styleUrls: ['./script-runner.component.css']
})
export class ScriptRunnerComponent implements OnInit {

  schemaLists: any = [
    { schemaName: 'BMS Local', },
    { schemaName: 'Mahmud Live', },
    { schemaName: 'Ananta Live', },
    { schemaName: 'Shangu Live', },
    { schemaName: 'Elegant Live', },
    { schemaName: 'Vision Live', },
    { schemaName: 'Sams Live', },
    { schemaName: 'Madadb Live', }
  ];

  // returnMessage: any = '';
  constructor() { }

  ngOnInit() {
  }
  // scriptRunner(sc) {
  //   //   return this.http.get<string>(`http://localhost:4200/run-script`, sc);
  //   return this.http.get('http://localhost:8484/run-script', sc);
  // }
  // Script Run Method
  // scriptRunner() {
  //   this.scriptRunnerService.scriptRunner('badrul').toPromise();
  // }
}
