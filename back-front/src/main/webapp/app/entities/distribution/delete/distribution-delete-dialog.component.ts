import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDistribution } from '../distribution.model';
import { DistributionService } from '../service/distribution.service';

@Component({
  templateUrl: './distribution-delete-dialog.component.html',
})
export class DistributionDeleteDialogComponent {
  distribution?: IDistribution;

  constructor(protected distributionService: DistributionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.distributionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
