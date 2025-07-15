import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeePool } from '../fee-pool.model';

@Component({
  selector: 'jhi-fee-pool-detail',
  templateUrl: './fee-pool-detail.component.html',
})
export class FeePoolDetailComponent implements OnInit {
  feePool: IFeePool | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feePool }) => {
      this.feePool = feePool;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
