import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuotationService } from 'src/app/core/services/quotation.service';
import { IFormCashFlow } from 'src/app/shared/interfaces/form.interface';
import { ITable } from 'src/app/shared/interfaces/table.interface';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {

  public cashFlowData: ITable[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public saveCashFlow(form: IFormCashFlow): void {
    this.cashFlowData = [
      ...this.cashFlowData,
      {
        selected: false,
        quotation: 0,
        ...form,
      },
    ];
  }

  public onTableUpdated(updatedTable: ITable[]) {
    this.cashFlowData = updatedTable;
  }

}
