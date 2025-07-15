import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRevenue } from '../revenue.model';
import { RevenueService } from '../service/revenue.service';

@Component({
  templateUrl: './revenue-delete-dialog.component.html',
})
export class RevenueDeleteDialogComponent {
  revenue?: IRevenue;

  constructor(protected revenueService: RevenueService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.revenueService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
