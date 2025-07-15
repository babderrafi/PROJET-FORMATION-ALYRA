import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DistributionComponent } from './list/distribution.component';
import { DistributionDetailComponent } from './detail/distribution-detail.component';
import { DistributionUpdateComponent } from './update/distribution-update.component';
import { DistributionDeleteDialogComponent } from './delete/distribution-delete-dialog.component';
import { DistributionRoutingModule } from './route/distribution-routing.module';

@NgModule({
  imports: [SharedModule, DistributionRoutingModule],
  declarations: [DistributionComponent, DistributionDetailComponent, DistributionUpdateComponent, DistributionDeleteDialogComponent],
  entryComponents: [DistributionDeleteDialogComponent],
})
export class DistributionModule {}
