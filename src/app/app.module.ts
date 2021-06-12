import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {
	ResizableModule
} from 'angular-resizable-element';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatIconModule,
	ResizableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
