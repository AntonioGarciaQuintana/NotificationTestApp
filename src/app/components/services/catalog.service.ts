import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogService {

  private readonly baseUrl = `${environment.apiUrl}/v1/catalogs`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl+'/categories');
  }

}
