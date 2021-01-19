import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ApiResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface Branch {
  url: string;
  ifsc: string;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  bank: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://127.0.0.1:8000/';

  getBanks() {
    return this.getApiResponse<Branch>(this.apiUrl + 'banks');
  }

  getBranches(offset: number, limit: number, city?: string) {
    return this.getApiResponse<Branch>(
      this.apiUrl +
        `branches/?offset=${offset}&limit=${limit}` +
        (city ? `&city=${city.toUpperCase()}` : '')
    );
  }

  getApiResponse<T>(url: string) {
    console.log(url);
    return this.http.get<ApiResponse<T>>(url);
  }
}
