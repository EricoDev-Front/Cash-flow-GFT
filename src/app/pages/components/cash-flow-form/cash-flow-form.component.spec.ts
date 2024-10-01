import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashFlowFormComponent } from './cash-flow-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CashFlowFormComponent', () => {
  let component: CashFlowFormComponent;
  let fixture: ComponentFixture<CashFlowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashFlowFormComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CashFlowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct controls', () => {
    expect(component['formCashFlow']).toBeDefined();
    expect(component['formCashFlow'].controls['transactionType']).toBeDefined();
    expect(component['formCashFlow'].controls['amount']).toBeDefined();
    expect(component['formCashFlow'].controls['description']).toBeDefined();
    expect(component['formCashFlow'].controls['date']).toBeDefined();
  });

  it('should emit the form value on submit', () => {
    spyOn(component.$submitFormEmitter, 'emit');

    component['formCashFlow'].setValue({
      transactionType: 'Income',
      amount: 1000,
      description: 'Salary',
      date: '2023-09-30'
    });
    
    component.submitForm();

    expect(component.$submitFormEmitter.emit).toHaveBeenCalledWith({
      transactionType: 'Income',
      amount: 1000,
      description: 'Salary',
      date: '2023-09-30'
    });
  });

  it('should validate the form controls', () => {
    const transactionTypeControl = component['formCashFlow'].controls['transactionType'];
    const amountControl = component['formCashFlow'].controls['amount'];
    const descriptionControl = component['formCashFlow'].controls['description'];
    const dateControl = component['formCashFlow'].controls['date'];

    transactionTypeControl.setValue('');
    expect(transactionTypeControl.valid).toBeFalse();

    amountControl.setValue('');
    expect(amountControl.valid).toBeFalse();

    descriptionControl.setValue('');
    expect(descriptionControl.valid).toBeFalse();

    dateControl.setValue('');
    expect(dateControl.valid).toBeFalse();

    transactionTypeControl.setValue('Expense');
    amountControl.setValue(200);
    descriptionControl.setValue('Office Supplies');
    dateControl.setValue('2023-09-30');

    expect(transactionTypeControl.valid).toBeTrue();
    expect(amountControl.valid).toBeTrue();
    expect(descriptionControl.valid).toBeTrue();
    expect(dateControl.valid).toBeTrue();
  });
});
