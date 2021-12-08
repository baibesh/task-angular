import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequest } from '../types/request.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private jsonUrl = 'assets/data/info.json';

  constructor(private http: HttpClient) {}
  get(): Observable<IRequest> {
    return this.http.get<IRequest>(this.jsonUrl);
  }
}
