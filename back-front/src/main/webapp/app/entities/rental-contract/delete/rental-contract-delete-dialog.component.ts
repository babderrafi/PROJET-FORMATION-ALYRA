import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRentalContract } from '../rental-contract.model';
import { RentalContractService } from '../service/rental-contract.service';

@Component({
  templateUrl: './rental-contract-delete-dialog.component.html',
})
export class RentalContractDeleteDialogComponent {
  rentalContract?: IRentalContract;

  constructor(protected rentalContractService: RentalContractService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rentalContractService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
