import { Component, OnInit } from '@angular/core';
import { QuotationService } from 'src/app/core/services/quotation.service';
import { IFormCashFlow } from 'src/app/shared/interfaces/form.interface';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {

  constructor(private readonly _quotationService: QuotationService) { }

  ngOnInit(): void {
  }

  public saveCashFlow(form: IFormCashFlow): void{
    console.log("FORM ===", form)
  }
}
