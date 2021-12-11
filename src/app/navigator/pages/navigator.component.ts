import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { INavigator } from '../types/navigator.interface';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit, OnDestroy {
  public information$!: Observable<INavigator[]>;
  private readonly queryParamSubscription!: Subscription;
  public active: number = 0;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.queryParamSubscription = this.route.queryParams.subscribe((param) => {
      if (param['tabs'] && !isNaN(param['tabs'])) this.active = +param['tabs'];
    });
  }

  ngOnInit(): void {
    this.information$ = this.apiService.get();
  }

  ngOnDestroy() {
    if (this.queryParamSubscription) this.queryParamSubscription.unsubscribe();
  }

  fullName(name: { first: string; last: string }): string {
    return name.first + ' ' + name.last;
  }
}
