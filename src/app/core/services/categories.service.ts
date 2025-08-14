import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { iCategoriesCreateResponse, iCategoriesResponse, iCreateCategoryRequest } from '../../shared/interfaces/categories.response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _apiUrl: string;
  private _http: HttpClient = inject(HttpClient);
  
  constructor() {
    this._apiUrl = `${environment.baseUrl}`;
   }

  public getCategories(): Observable<iCategoriesResponse[]> {
    return this._http.get<iCategoriesResponse[]>(`${this._apiUrl}/api/categories`);
  }
  public createCategory(category: iCreateCategoryRequest): Observable<iCategoriesCreateResponse> {
    return this._http.post<iCategoriesCreateResponse>(`${this._apiUrl}/api/categories`, category);
  }
}
