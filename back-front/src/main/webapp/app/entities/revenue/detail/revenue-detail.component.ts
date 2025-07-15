import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRevenue } from '../revenue.model';

@Component({
  selector: 'jhi-revenue-detail',
  templateUrl: './revenue-detail.component.html',
})
export class RevenueDetailComponent implements OnInit {
  revenue: IRevenue | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ revenue }) => {
      this.revenue = revenue;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
