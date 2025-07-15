import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFeePool } from '../fee-pool.model';
import { FeePoolService } from '../service/fee-pool.service';
import { FeePoolDeleteDialogComponent } from '../delete/fee-pool-delete-dialog.component';

@Component({
  selector: 'jhi-fee-pool',
  templateUrl: './fee-pool.component.html',
})
export class FeePoolComponent implements OnInit {
  feePools?: IFeePool[];
  isLoading = false;
  isSimulating = false;

  constructor(protected feePoolService: FeePoolService, protected modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.feePoolService.query().subscribe({
      next: (res: HttpResponse<IFeePool[]>) => {
        this.isLoading = false;
        this.feePools = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  trackId(index: number, item: IFeePool): number {
    return item.id!;
  }

  delete(feePool: IFeePool): void {
    const modalRef = this.modalService.open(FeePoolDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.feePool = feePool;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  calculatePercentage(redistribue: number | null | undefined, collecte: number | null | undefined): string {
    const r = redistribue ?? 0;
    const c = collecte ?? 0;
    if (c === 0) {
      return '0.00';
    }
    return ((r / c) * 100).toFixed(2);
  }


  simulateRedistribution(): void {
    this.isSimulating = true;
    setTimeout(() => {
      alert('Redistribution simulée terminée');
      this.isSimulating = false;
      this.loadAll();
    }, 1500);
  }

  requestFinancialReport(): void {
    alert('Rapport financier généré (mocké). Peut être téléchargé ou envoyé par mail.');
  }
}
