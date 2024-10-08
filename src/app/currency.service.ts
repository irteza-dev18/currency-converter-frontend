import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://localhost:3000/api/currency'; // Update with your server URL

  constructor(private http: HttpClient) {}

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?from=${from}&to=${to}&amount=${amount}`);
  }
}
