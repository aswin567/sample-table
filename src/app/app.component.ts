import { Component } from '@angular/core';
import { ELEMENT_DATA } from './data.const';
import { Roles } from './roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 dataSource = ELEMENT_DATA;
 roles = Roles;

 selectedItem: number;

 onSelectionOfItem(numberOfItemSelected: number): void{
   this.selectedItem = numberOfItemSelected;
 }
}
