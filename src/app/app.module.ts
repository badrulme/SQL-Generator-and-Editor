import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { SqlGenComponent } from './sql-gen/sql-gen.component';
import { FormsModule } from '@angular/forms';
import { SqlEditorComponent } from './sql-editor/sql-editor.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CaseConverterComponent } from './case-converter/case-converter.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SqlGenComponent,
    SqlEditorComponent,
    ErrorComponent,
    FooterComponent,
    HomeComponent,
    CaseConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
