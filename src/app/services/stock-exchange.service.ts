import { StockExchange } from './../models/stock-exchange.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockExchangeService {
  /**
   * Endpoint of the stock exchange data
   *
   * @private
   * @memberof StockExchangeService
   */
  private _stockDataUrl = 'assets/stock-data.json';

  constructor(protected http: HttpClient) {}

  /**
   * Returns a list of all exchanges.
   * Ideally, this should be paginated and a custom Page object with metadata
   * info returned.
   *
   * @param page
   * @param perPage
   * @returns Observable<StockExchange[]> all exchanges
   */
  public getAllExchanges(page = 0, perPage = 10): Observable<StockExchange[]> {
    return this.http
      .get<StockExchange[]>(this._stockDataUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   *
   * Retrieves an exchange by its code
   *
   * @param code
   * @returns
   */
  public getExchange(code: string): Observable<StockExchange | undefined> {
    return this.http.get<StockExchange[]>(this._stockDataUrl).pipe(
      map((sec) =>
        sec.find((exc) => exc?.code?.toLowerCase() === code.toLowerCase())
      ),
      catchError(this.handleError)
    );
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error occurred.
      return throwError(() => {
        const err: any = new Error('Something happened on your side.');
        err.status = error.status;
        err.timestamp = Date.now();
        return err;
      });
    } else {
      // An error occured on the server side. Perhaps the message body
      // can give more info
      console.error(
        `Server error code ${error.status}, body was: `,
        error.message
      );
    }
    // Return a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
