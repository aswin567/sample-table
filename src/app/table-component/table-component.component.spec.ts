import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { ELEMENT_DATA } from '../data.const';
import { TableContent } from '../table-content';

import { TableComponentComponent } from './table-component.component';

describe('TableComponentComponent', () => {
  let fixture: ComponentFixture<TableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponentComponent],

      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(TableComponentComponent);
  }));


  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should return true if all selected', () => {
    const selectedTestValue = 6;
    fixture.componentInstance.selection.selected.length = selectedTestValue;
    fixture.componentInstance.dataSource = new MatTableDataSource<TableContent>(ELEMENT_DATA);

    const resultValue = fixture.componentInstance.isAllSelected();

    expect(resultValue).toBeTrue();

  });


  it('should return false if not all selected', () => {
    const selectedTestValue = 0;
    fixture.componentInstance.selection.selected.length = selectedTestValue;
    fixture.componentInstance.dataSource = new MatTableDataSource<TableContent>(ELEMENT_DATA);

    const resultValue = fixture.componentInstance.isAllSelected();

    expect(resultValue).toBeFalse();

  });

  it('should give proper value for displayColoum', () => {

    const result = fixture.componentInstance.displayColoum(ELEMENT_DATA);
    const expectedResult = ['select', 'id', 'name', 'email', 'roles', 'action'];

    expect(result).toEqual(expectedResult);

  });

  it('should give proper value for checkboxLabel', () => {

    const result = fixture.componentInstance.checkboxLabel(ELEMENT_DATA[0]);
    // fixture.detectChanges();
    const labelForAllSelection = 'select row 2';


    expect(result).toEqual(labelForAllSelection);

  });

});
