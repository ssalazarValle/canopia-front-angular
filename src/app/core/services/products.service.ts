import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { iCreateProductRequest, iCreateProductResponse, iProductsResponse } from '../../shared/interfaces/products.response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string;

  constructor() {
    this._apiUrl = `${environment.baseUrl}`;
  }

  public getProducts(): Observable<iProductsResponse[]> {
    return this._http.get<iProductsResponse[]>(`${this._apiUrl}/api/products`);
  }

  public createProducts(product: iCreateProductRequest): Observable<iCreateProductResponse> {
    console.log("🚀 ~ ProductsService ~ createProducts ~ product:", product)
    return this._http.post<iCreateProductResponse>(`${this._apiUrl}/api/products`, product);
  }
}
