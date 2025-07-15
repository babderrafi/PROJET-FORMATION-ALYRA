import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FeePoolComponent } from './list/fee-pool.component';
import { FeePoolDetailComponent } from './detail/fee-pool-detail.component';
import { FeePoolUpdateComponent } from './update/fee-pool-update.component';
import { FeePoolDeleteDialogComponent } from './delete/fee-pool-delete-dialog.component';
import { FeePoolRoutingModule } from './route/fee-pool-routing.module';

@NgModule({
  imports: [SharedModule, FeePoolRoutingModule],
  declarations: [FeePoolComponent, FeePoolDetailComponent, FeePoolUpdateComponent, FeePoolDeleteDialogComponent],
  entryComponents: [FeePoolDeleteDialogComponent],
})
export class FeePoolModule {}
