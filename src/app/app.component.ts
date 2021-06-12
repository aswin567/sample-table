import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResizeEvent } from 'angular-resizable-element';
import { TableContent } from './table-content';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'roles', 'action'];
  dataSource = new MatTableDataSource<TableContent>(ELEMENT_DATA);
  selection = new SelectionModel<TableContent>(true, []);
  selectedRowIndex: any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TableContent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onResizeEnd(event: ResizeEvent, columnName): void {
    if (event.edges.right) {
      const cssValue = event.rectangle.width + 'px';
      const columnElts = document.getElementsByClassName('mat-column-' + columnName);
      for (let i = 0; i < columnElts.length; i++) {
        const currentEl = columnElts[i] as HTMLDivElement;
        currentEl.style.width = cssValue;
      }
    }
  }

  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }

  arrowUpEvent(row: object, index: number) {
    const incIndex = index - 2;
    var nextrow = this.dataSource.filteredData[incIndex];
    if (this.dataSource.filteredData.length - 1 >= incIndex) {

      this.highlight(nextrow);
    }
  }

  arrowDownEvent(row: object, index: number) {
    var nextrow = this.dataSource.filteredData[index];
    if (this.dataSource.filteredData.length - 1 >= index) {

      this.highlight(nextrow);
    }
  }

  keyPress(event: KeyboardEvent, row: object, index: number) {
    switch (event.keyCode) {
      case 40: // down arrow
        this.arrowDownEvent(row, index);
        break;

      case 38: // up arrow
        this.arrowUpEvent(row, index);
        break;

      case 39:
        this.arrowDownEvent(row, index);
        break;
        
      case 37:
        this.arrowDownEvent(row, index);
        break;
    }
  }
}


const ELEMENT_DATA: Array<TableContent> = [
  { id: 1, name: 'John', email: 'john@abc.com', roles: ['Admin', 'Editor', 'Viewer'] },
  { id: 2, name: 'Jane', email: 'jane@abc.com', roles: ['Admin', 'Editor', 'Viewer'] },
  { id: 3, name: 'Jim', email: 'jim@abc.com', roles: ['Viewer'] },
  { id: 4, name: 'Sam', email: 'sam@abc.com', roles: ['Editor', 'Viewer'] },
  { id: 5, name: 'Larry', email: 'lary@abc.com', roles: ['Viewer'] },
  { id: 6, name: 'Monica', email: 'monica@abc.com', roles: ['Editor', 'Viewer'] }
];