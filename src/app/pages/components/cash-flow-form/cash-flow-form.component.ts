import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cash-flow-form',
  templateUrl: './cash-flow-form.component.html',
  styleUrls: ['./cash-flow-form.component.scss'],
})
export class CashFlowFormComponent implements OnInit {

  constructor(private readonly _formBuilder: FormBuilder) { }

  protected formCashFlow!: FormGroup;
  @Output() $submitFormEmitter = new EventEmitter();

  ngOnInit(): void {
    this.createForm();
  }

  public submitForm(): void {
      this.$submitFormEmitter.emit(this.formCashFlow.value)
  }

  private createForm(): void{
    this.formCashFlow = this._formBuilder.group({
      transactionType: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }
}
