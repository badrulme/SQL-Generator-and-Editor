import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SqlGenComponent } from './sql-gen/sql-gen.component';
import { SqlEditorComponent } from './sql-editor/sql-editor.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { CaseConverterComponent } from './case-converter/case-converter.component';
import { ScriptRunnerComponent } from './script-runner/script-runner.component';
import { ApiCreatorComponent } from './api-creator/api-creator.component';

const routes: Routes = [
  { path: '', component: SqlGenComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sql-generator', component: SqlGenComponent },
  { path: 'sql-editor', component: SqlEditorComponent },
  { path: 'case-converter', component: CaseConverterComponent },
  { path: 'script-runner', component: ScriptRunnerComponent },
  { path: 'api-creator', component: ApiCreatorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
