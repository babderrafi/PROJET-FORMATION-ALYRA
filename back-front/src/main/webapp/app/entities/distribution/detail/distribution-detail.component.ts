import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDistribution } from '../distribution.model';

@Component({
  selector: 'jhi-distribution-detail',
  templateUrl: './distribution-detail.component.html',
})
export class DistributionDetailComponent implements OnInit {
  distribution: IDistribution | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ distribution }) => {
      this.distribution = distribution;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
