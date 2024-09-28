import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ECurrency } from 'src/app/shared/enums/currency.enum';
import { IAllCurrencies } from 'src/app/shared/interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private readonly _http: HttpClient) { }

  private readonly baseUrl = "https://economia.awesomeapi.com.br/json";

  public getAllQuotation(): Observable<IAllCurrencies> {
    return this._http.get<IAllCurrencies>(`${this.baseUrl}/all`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  public getQuotationByCurrency(currency: ECurrency): Observable<IAllCurrencies> {
    return this._http.get<IAllCurrencies>(`${this.baseUrl}/last/${currency}`).pipe(
      catchError(error => throwError(() => error))
    );
  }
  

}
