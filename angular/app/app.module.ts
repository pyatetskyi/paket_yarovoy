import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent }   from './app.component';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';

@NgModule({
  imports:      [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    UPLOAD_DIRECTIVES
  ],
  providers: [
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
