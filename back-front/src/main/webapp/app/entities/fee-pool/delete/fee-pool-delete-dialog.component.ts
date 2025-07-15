import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFeePool } from '../fee-pool.model';
import { FeePoolService } from '../service/fee-pool.service';

@Component({
  templateUrl: './fee-pool-delete-dialog.component.html',
})
export class FeePoolDeleteDialogComponent {
  feePool?: IFeePool;

  constructor(protected feePoolService: FeePoolService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.feePoolService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
