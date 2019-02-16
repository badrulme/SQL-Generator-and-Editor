import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScriptRunnerService {

  constructor(private http: HttpClient) { }

  scriptRunner(sc) {
    return this.http.get<string>(`http://localhost:4200/run-script`, sc);
  }
}
