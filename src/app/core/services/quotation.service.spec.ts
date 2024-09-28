import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuotationService } from './quotation.service';
import { ECurrency } from 'src/app/shared/enums/currency.enum';
import { IAllCurrencies } from 'src/app/shared/interfaces/currency.interface';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { allQuotationsMock, quotationByCurrencyMock } from 'src/app/shared/mocks/mock-unit-test';

describe('QuotationService', () => {
  let service: QuotationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuotationService]
    });
    service = TestBed.inject(QuotationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllQuotation should get all quotations', () => {
    const http = TestBed.inject(HttpClient);

    spyOn(http, 'get').and.returnValue(of(allQuotationsMock));

    service.getAllQuotation().subscribe(quotations => {
      expect(quotations).toEqual(allQuotationsMock);
    });
  });

  it('#getAllQuotation should catch an error then throw an exception', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(throwError(() => 'error'));

    service.getAllQuotation().subscribe({
      next: () => { },
      error: err => expect(err).toBeDefined()
    });
  });

  it('#getQuotationByCurrency should get quotation by currency', () => {
    const http = TestBed.inject(HttpClient);

    spyOn(http, 'get').and.returnValue(of(quotationByCurrencyMock));

    service.getQuotationByCurrency(ECurrency.BTC).subscribe({
      next: () => { },
      error: err => expect(err).toBeDefined()
    });
  });

  it('#getQuotationByCurrency should catch an error then throw an exception', () => {
    const http = TestBed.inject(HttpClient);

    spyOn(http, 'get').and.returnValue(throwError(() => 'error'));

    service.getQuotationByCurrency(ECurrency.USD).subscribe({
      next: () => { },
      error: err => expect(err).toBeDefined()
    });
  });
});
