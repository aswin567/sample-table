import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ResizeEvent } from 'angular-resizable-element';
import { Roles } from '../roles.enum';
import { TableContent } from '../table-content';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements AfterViewInit, OnChanges {

  @ViewChild(MatSort) sort: MatSort;
  @Input() roles: Roles;
  @Input() dataSourceInput: Array<TableContent>;
  @Output() emitNumberOfItemsSelected: EventEmitter<number> = new EventEmitter<number>();

  dataSource: MatTableDataSource<TableContent>;
  selection = new SelectionModel<TableContent>(true, []);
  displayedColumns: Array<string> = [];
  selectedRowIndex: TableContent;
  iconEdit = faEdit;
  iconView = faEye;
  iconDelete = faTrashAlt;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(simpleChange: SimpleChanges): void{
    const dataSourceInputChange = simpleChange.dataSourceInput;
    const selectionChange = simpleChange.selection;
    if (dataSourceInputChange){

      this.dataSource = new MatTableDataSource<TableContent>(this.dataSourceInput);
      this.displayedColumns = this.displayColoum(this.dataSourceInput);
    }

    if (selectionChange){
      const selectionCurrentValue = selectionChange.currentValue;
      this.emitNumberOfItemsSelected.emit(selectionCurrentValue);
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.emitLengthValue(numSelected);

    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();

      return;
    }

    this.selection.select(...this.dataSource.data);
  }

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
      // tslint:disable-next-line
      for (let i = 0; i < columnElts.length; i++) {
        const currentEl = columnElts[i] as HTMLDivElement;
        currentEl.style.width = cssValue;
      }
    }
  }

  displayColoum(dataInput: Array<TableContent>): Array<string> {
    const tableItem: TableContent = dataInput[0];
    const keys = Object.keys(tableItem);
    keys.unshift('select');
    keys.push('action');

    return keys;

  }

  emitLengthValue(value: number): void{
    this.emitNumberOfItemsSelected.emit(value);
  }

}
