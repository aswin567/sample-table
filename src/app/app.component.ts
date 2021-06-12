import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ResizeEvent } from 'angular-resizable-element';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { TableContent } from './table-content';
import { Roles } from './roles.enum';
import { ELEMENT_DATA } from './data.const';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<TableContent>(ELEMENT_DATA);
  selection = new SelectionModel<TableContent>(true, []);
  displayedColumns: Array<string> = ['select', 'id', 'name', 'email', 'roles', 'action'];
  selectedRowIndex: TableContent;
  roles = Roles;
  iconEdit = faEdit;
  iconView = faEye;
  iconDelete = faTrashAlt;

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
      const labelForAllSelection = `${this.isAllSelected() ? 'deselect' : 'select'} all`;

      return labelForAllSelection;
    }
    const labelForSingleSelection = `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;

    return labelForSingleSelection;
  }

  onResizeEnd(event: ResizeEvent, columnName): void {
    if (event.edges.right) {
      const cssValue = `${event.rectangle.width}px`;
      const columnElts = document.getElementsByClassName(`mat-column-${columnName}`);
      for (let i = 0; i < columnElts.length; i++) {
        const currentEl = columnElts[i] as HTMLDivElement;
        currentEl.style.width = cssValue;
      }
    }
  }

}
