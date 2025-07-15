import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INFTLevel } from '../nft-level.model';
import { NFTLevelService } from '../service/nft-level.service';

@Component({
  templateUrl: './nft-level-delete-dialog.component.html',
})
export class NFTLevelDeleteDialogComponent {
  nFTLevel?: INFTLevel;

  constructor(protected nFTLevelService: NFTLevelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nFTLevelService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
