import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SqlGenComponent } from './sql-gen/sql-gen.component';
import { SqlEditorComponent } from './sql-editor/sql-editor.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: SqlGenComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sql-generator', component: SqlGenComponent },
  { path: 'sql-editor', component: SqlEditorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
