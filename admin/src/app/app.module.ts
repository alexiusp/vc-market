import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, BrowserXhr }    from '@angular/http';

import { CORSBrowserXHR } from './http.hack';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { ParserComponent } from './home/parser/parser.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
		DataComponent,
		ParserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'data', component: DataComponent }
    ])
  ],
  providers: [
		{provide:BrowserXhr, useClass: CORSBrowserXHR}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
