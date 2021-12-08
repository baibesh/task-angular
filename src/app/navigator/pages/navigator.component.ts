import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { INavigator } from '../types/navigator.interface';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public active: number = 0;
  public info!: INavigator[];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((param) => {
      if (param['tabs'] && !isNaN(param['tabs'])) this.active = +param['tabs'];
    });
  }

  ngOnInit(): void {
    this.apiService
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        this.info = item;
      });
  }
}
