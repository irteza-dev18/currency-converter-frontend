import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = ['USD', 'EUR', 'GBP', 'INR'];
  fromCurrency = 'USD';
  toCurrency = 'EUR';
  amount: number = 1;
  convertedAmount: number | null = null;
  loading: boolean = false;
  conversionHistory: any[] = [];

  constructor(private http: HttpClient) {}

  convert() {
    this.loading = true;
    this.http
    .get<any>(`https://server-seven-virid.vercel.app/api/currency?from=${this.fromCurrency}&to=${this.toCurrency}&amount=${this.amount}`)
    .subscribe(
      (response) => {
        this.convertedAmount = response.convertedAmount;
        this.loading = false;
        this.addToHistory();
      },
      (error) => {
        console.error('Error fetching currency data:', error);
        this.loading = false;
      }
    );
  
  }

  addToHistory() {
    const record = {
      date: new Date().toLocaleString(),
      amount: this.amount,
      from: this.fromCurrency,
      convertedAmount: this.convertedAmount,
      to: this.toCurrency,
    };
    this.conversionHistory.push(record);
    localStorage.setItem('conversionHistory', JSON.stringify(this.conversionHistory));
  }

  ngOnInit() {
    const history = localStorage.getItem('conversionHistory');
    if (history) {
      this.conversionHistory = JSON.parse(history);
    }
  }
}
