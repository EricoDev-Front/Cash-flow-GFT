import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowTableComponent } from './cash-flow-table.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuotationService } from 'src/app/core/services/quotation.service';
import { allQuotationsMock, mockArray } from 'src/app/shared/mocks/mock-unit-test';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CashFlowTableComponent', () => {
  let component: CashFlowTableComponent;
  let fixture: ComponentFixture<CashFlowTableComponent>;
  let quotationService: jasmine.SpyObj<QuotationService>;

  let formBuilder: FormBuilder;
  const quotationServiceMock = jasmine.createSpyObj('QuotationService', ['getAllQuotation']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashFlowTableComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        {
          provide: QuotationService, useValue: quotationServiceMock
        }
      ]
    })
      .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    quotationService = TestBed.inject(QuotationService) as jasmine.SpyObj<QuotationService>;

    fixture = TestBed.createComponent(CashFlowTableComponent);
    component = fixture.componentInstance;

    const mockFormGroup1: FormGroup = formBuilder.group({
      quotationCurrency: ['USD', [Validators.required]],
      date: ['2024-11-18', [Validators.required]],
    });

    const mockFormGroup2: FormGroup = formBuilder.group({
      transactionType: ['expense', [Validators.required]],
      amount: [100, [Validators.required]],
      description: ['Test expense', [Validators.required]],
      date: ['2024-11-18', [Validators.required]],
      selected: [true],
      quotation: [1],
    });

    quotationService.getAllQuotation.and.returnValue(of(allQuotationsMock));
    spyOn(formBuilder, 'group').and.returnValues(mockFormGroup1, mockFormGroup2);
    fixture.detectChanges();
    component.setTable = mockArray;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('#ngOnInit should set the filteredTable', () => {
    fixture.detectChanges();
    expect(component['filteredTable']).toBeDefined();
  });

  it('#getAllQuotations should throws an error then show error message', () => {
    quotationService.getAllQuotation.and.returnValue(throwError(() => new Error('Erro ao buscar cotações')))
    const modal = By.css('[data-testid="errorModal"]');
    fixture.detectChanges();
    expect(modal).toBeTruthy();
  });

  it('#formChanges should catch changes in formControl "quotationCurrency" then calculate the new quotation', () => {
    const oldValue = component.table[0].quotation;
    component['formTable'].controls['quotationCurrency'].setValue(JSON.stringify({ currency: 5.95, acronym: 'USD' }));
    fixture.detectChanges();
    expect(oldValue).not.toEqual(component.table[0].quotation);
  });

  it('#formChanges should catch changes in formControl "date" then filter the table to corresponding date', () => {
    const oldLength = component.table.length;
    component['formTable'].controls['date'].setValue('2024-11');
    fixture.detectChanges();
    expect(oldLength).not.toEqual(component['filteredTable'].length);
  });

  it('#updatePaginatedData should update paginated data then show in the screen', () => {
    fixture.detectChanges();
    component.updatePaginatedData();
    expect(component['paginatedData']).toBeDefined();
  });

  it('#goToPage should update curent page then show in the screen', () => {
    fixture.detectChanges();
    component.goToPage(1);
    expect(component['currentPage']).toBe(1);
  });

  it('#handleCheckedAll should check all items then show in the screen', () => {
    fixture.detectChanges();
    const checkEvent = { target: { checked: true } } as unknown as Event;
    component.handleCheckedAll(checkEvent);
    expect(component.table[0].selected).toBeTrue();
  });

  it('#deleteItem should delet one item then show in the screen', () => {
    const oldLength = component.table.length;
    fixture.detectChanges();
    component.deleteItem();
    expect(oldLength).not.toBe(component['filteredTable'].length);
  });

  it('#deleteAllItems should delet all items then show in the screen', () => {
    const oldLength = component.table.length;
    fixture.detectChanges();
    component.deleteAllItems();
    expect(oldLength).not.toBe(component['filteredTable'].length);
  });

  it('#quotationCurrencyValueFormatter should format the quotation currency value then show in the screen', () => {
    fixture.detectChanges();
    
    expect(component.quotationCurrencyValueFormatter({
      label: 'valor',
      acronym: 'USD',
      value: '2.00',
    })).toBe(JSON.stringify({currency: '2.00', acronym: 'USD'}));
  });

  it('#changeItemSelected should change the select value then show in the screen', () => {
    fixture.detectChanges();
    const item = {selected: false, date: '2024-11-18', transactionType: 'Entrada', amount: 310, description: 'Item 27', quotation: 52.10084033613445};
    component.changeItemSelected({selected: true, date: '2024-11-18', transactionType: 'Entrada', amount: 310, description: 'Item 27', quotation: 52.10084033613445});
    expect(item.selected).toBeFalse()
  });
  
  it('#toggleEditModal should change modal ngif value then show in the screen', () => {
    const oldValue = component['showEditModal'];
    fixture.detectChanges();
    component.toggleEditModal();
    expect(oldValue).toBeFalse();
  });

});