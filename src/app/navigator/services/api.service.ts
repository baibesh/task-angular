import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IRequest } from '../types/request.interface';
import { HttpClient } from '@angular/common/http';
import { IData } from '../types/data.interface';
import { INavigator } from '../types/navigator.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private jsonUrl = 'assets/data/info.json';

  constructor(private http: HttpClient) {}
  get(): Observable<INavigator[]> {
    return this.http
      .get<IRequest>(this.jsonUrl)
      .pipe(map((v) => this.convertToArray(v.data)));
  }

  private convertToArray(data: IData[]): INavigator[] {
    const result = data.reduce((pv: any, cv: IData) => {
      (pv[cv['type']] = pv[cv['type']] || []).push(cv);
      return pv;
    }, {});

    return Object.keys(result).map((key) => {
      return {
        type: key,
        data: result[key],
      };
    });
  }
}
