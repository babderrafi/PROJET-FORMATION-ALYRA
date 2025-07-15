import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRentalContract } from '../rental-contract.model';

@Component({
  selector: 'jhi-rental-contract-detail',
  templateUrl: './rental-contract-detail.component.html',
})
export class RentalContractDetailComponent implements OnInit {
  rentalContract: IRentalContract | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rentalContract }) => {
      this.rentalContract = rentalContract;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
