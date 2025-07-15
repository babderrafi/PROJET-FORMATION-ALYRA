import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RentalContractComponent } from './list/rental-contract.component';
import { RentalContractDetailComponent } from './detail/rental-contract-detail.component';
import { RentalContractUpdateComponent } from './update/rental-contract-update.component';
import { RentalContractDeleteDialogComponent } from './delete/rental-contract-delete-dialog.component';
import { RentalContractRoutingModule } from './route/rental-contract-routing.module';

@NgModule({
  imports: [SharedModule, RentalContractRoutingModule],
  declarations: [
    RentalContractComponent,
    RentalContractDetailComponent,
    RentalContractUpdateComponent,
    RentalContractDeleteDialogComponent,
  ],
  entryComponents: [RentalContractDeleteDialogComponent],
})
export class RentalContractModule {}
