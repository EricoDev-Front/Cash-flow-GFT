import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashFlowComponent } from './cash-flow.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IFormCashFlow } from 'src/app/shared/interfaces/form.interface';
import { ITable } from 'src/app/shared/interfaces/table.interface';

describe('CashFlowComponent', () => {
  let component: CashFlowComponent;
  let fixture: ComponentFixture<CashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashFlowComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save cash flow data correctly', () => {
    const formMock: IFormCashFlow = {
      amount: 100,
      date: '2024-11-18',
      transactionType: 'Income',
      description: 'Monthly income'
    };

    component.saveCashFlow(formMock);

    expect(component.cashFlowData.length).toBe(1);
    expect(component.cashFlowData[0]).toEqual(jasmine.objectContaining({
      selected: false,
      quotation: 0,
      ...formMock,
    }));
  });

  it('should update cash flow data with onTableUpdated', () => {
    const updatedTableMock: ITable[] = [
      { selected: false, quotation: 1, amount: 200, date: '2024-11-18', transactionType: 'Expense', description: 'Monthly expense' },
      { selected: true, quotation: 2, amount: 300, date: '2024-11-18', transactionType: 'Income', description: 'Bonus received' },
    ];

    component.onTableUpdated(updatedTableMock);

    expect(component.cashFlowData).toEqual(updatedTableMock);
  });
});
