import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ECurrency } from 'src/app/shared/enums/currency.enum';
import { ICurrencyOption } from 'src/app/shared/interfaces/currency.interface';
import { mockArray } from 'src/app/shared/mocks/mock-unit-test';

@Component({
  selector: 'app-cash-flow-table',
  templateUrl: './cash-flow-table.component.html',
  styleUrls: ['./cash-flow-table.component.scss']
})
export class CashFlowTableComponent implements OnInit {
  
  constructor(private readonly _formBuilder: FormBuilder) { }
  
  protected currencyList: ICurrencyOption[] = [];
  protected table = mockArray;
  protected checkedAll = false;
  protected currency = 'CAD';
  protected formTable!: FormGroup;
  protected currentDate = new Date().toISOString().slice(0, 7);;
  
  
  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void{
    this.formTable = this._formBuilder.group({
      quotationCurrency: ['', [Validators.required]],
      date: [this.currentDate, [Validators.required]]
    });
  }

  public handleCheckedAll(value: Event): void {
    const checkbox = value.target as HTMLInputElement;
    this.table.map((item) => {
      item.selected = checkbox.checked;
    })
  }
}
