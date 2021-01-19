import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  favourite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://radiant-oasis-80551.herokuapp.com/';

  cache = {};

  getBranches(
    offset: number,
    limit: number,
    city?: string
  ): Observable<ApiResponse<Branch>> {
    return this.getApiResponse<Branch>(
      this.apiUrl +
        `branches/?offset=${offset}&limit=${limit}` +
        (city ? `&city=${city.toUpperCase()}` : '')
    );
  }

  getBranch(ifsc: string): Observable<Branch> {
    if (this.cache[ifsc]) {
      return this.cache[ifsc];
    }

    this.cache[ifsc] = this.http
      .get<Branch>(this.apiUrl + `branches/${ifsc}/`)
      .pipe(
        shareReplay(1),
        catchError((err) => {
          delete this.cache[ifsc];
          return null;
        })
      );

    return this.cache[ifsc];
  }

  getApiResponse<T>(url: string): Observable<ApiResponse<T>> {
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

    return this.cache[url];
  }
}
