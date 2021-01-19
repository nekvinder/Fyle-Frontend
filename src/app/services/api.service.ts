import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay } from 'rxjs/operators';

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

  cache = {};

  getBranches(offset: number, limit: number, city?: string) {
    return this.getApiResponse<Branch>(
      this.apiUrl +
        `branches/?offset=${offset}&limit=${limit}` +
        (city ? `&city=${city.toUpperCase()}` : '')
    );
  }

  getApiResponse<T>(url: string) {
    //for caching api calls
    if (this.cache[url]) {
      return this.cache[url];
    }

    this.cache[url] = this.http.get<ApiResponse<T>>(url).pipe(
      shareReplay(1),
      catchError((err) => {
        delete this.cache[url];
        return null;
      })
    );

    return this.http.get<ApiResponse<T>>(url);
  }
}
