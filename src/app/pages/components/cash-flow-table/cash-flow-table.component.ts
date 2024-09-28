import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { mockArray } from 'src/app/shared/mocks/mock-unit-test';

@Component({
  selector: 'app-cash-flow-table',
  templateUrl: './cash-flow-table.component.html',
  styleUrls: ['./cash-flow-table.component.scss']
})
export class CashFlowTableComponent implements OnInit {

  constructor() { }

  protected table = mockArray;
  protected checkedAll = false;
  protected currency = 'CAD';
  protected formTable!: FormGroup;

  
  ngOnInit(): void {
  }

  public handleCheckedAll(value: Event): void {
    const checkbox = value.target as HTMLInputElement;
    this.table.map((item) => {
      item.selected = checkbox.checked;
    })
  }
}
