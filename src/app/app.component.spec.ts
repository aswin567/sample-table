import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output, ViewChild } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatSort } from '@angular/material/sort';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ELEMENT_DATA } from './data.const';
import { Roles } from './roles.enum';
import { TableComponentComponent } from './table-component/table-component.component';
import { TableContent } from './table-content';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  @Component({
    selector: 'app-table-component',
    template: '<div>Mock Template</div>',
  })
  class FakeTableComponent {

    @ViewChild(MatSort) sort: MatSort;
    @Input() roles: Roles;
    @Input() dataSourceInput: Array<TableContent>;
    @Output() emitNumberOfItemsSelected: EventEmitter<number> = new EventEmitter<number>();

  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent, TableComponentComponent
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should add the value (10) to selectedItem', () => {
    const testingValue = 10;
    fixture.componentInstance.onSelectionOfItem(testingValue);

    expect(fixture.componentInstance.selectedItem).toBe(testingValue);
  });

  it('should add the value (0) to selectedItem', () => {
    const testingValue = 0;
    fixture.componentInstance.onSelectionOfItem(testingValue);

    expect(fixture.componentInstance.selectedItem).toBe(testingValue);
  });

  it('should add the value (-10) to selectedItem', () => {
    const testingValue = -10;
    fixture.componentInstance.onSelectionOfItem(testingValue);

    expect(fixture.componentInstance.selectedItem).toBe(testingValue);
  });

  it('should the count in template and selected item must be same', () => {
    const testingValue = 10;
    fixture.componentInstance.onSelectionOfItem(testingValue);
    fixture.detectChanges();

    const countInTemplate = fixture.nativeElement.querySelector('h2>.highlight').textContent;
    expect(Number(countInTemplate)).toBe(testingValue);
  });

  it('should the hide h2 in template if the value is less than 1', () => {
    const testingValue = 0;
    fixture.componentInstance.onSelectionOfItem(testingValue);
    fixture.detectChanges();

    const countInTemplate = fixture.nativeElement.querySelector('h2');
    expect(countInTemplate).toBeNull();
  });

  it('shold check the element data is getting updated in the template', () => {

    fixture.componentInstance.dataSource = ELEMENT_DATA;
    fixture.componentInstance.selectedItem = 1;
    fixture.detectChanges();

    const countInTemplate = fixture.nativeElement.querySelector('#totalLength').textContent;

    expect(Number(countInTemplate)).toBe(ELEMENT_DATA.length);
  });

  it('should print the values in proper sentence', () => {
    const selectedValue = 4;
    fixture.componentInstance.dataSource = ELEMENT_DATA;
    fixture.componentInstance.selectedItem = selectedValue;
    fixture.detectChanges();

    const textinTemplate = fixture.nativeElement.querySelector('h2').textContent;

    expect(textinTemplate).toBe(`Users ${selectedValue} selected out of ${ELEMENT_DATA.length}`);
  });

  it('should triger onSelectionOfItem when table emit event', () => {
    const testValue = 20;
    spyOn(fixture.componentInstance, 'onSelectionOfItem');

    fixture.detectChanges();
    const tableComponentDes = fixture.debugElement.query(By.directive(TableComponentComponent));
    tableComponentDes.componentInstance.emitLengthValue(testValue);

    expect(fixture.componentInstance.onSelectionOfItem).toHaveBeenCalledWith(testValue);
  });
});
