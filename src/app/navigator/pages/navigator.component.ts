import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { map, Subject, takeUntil } from 'rxjs';
import { IData } from '../types/data.interface';
import { INavigator } from '../types/navigator.interface';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public active = 0;
  public info!: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((param) => {
      // в начале использовал +param['tabs'], но когда прилетал 0, почему та условие не срабатывал
      if (param['tabs'] && !isNaN(param['tabs'])) this.active = +param['tabs'];
    });
  }

  ngOnInit(): void {
    this.apiService
      .get()
      .pipe(
        takeUntil(this.destroy$),
        map((v) => this.convertToArray(v.data))
      )
      .subscribe((item) => {
        this.info = item;
      });
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
