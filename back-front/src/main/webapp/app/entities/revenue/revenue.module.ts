import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RevenueComponent } from './list/revenue.component';
import { RevenueDetailComponent } from './detail/revenue-detail.component';
import { RevenueUpdateComponent } from './update/revenue-update.component';
import { RevenueDeleteDialogComponent } from './delete/revenue-delete-dialog.component';
import { RevenueRoutingModule } from './route/revenue-routing.module';

@NgModule({
  imports: [SharedModule, RevenueRoutingModule],
  declarations: [RevenueComponent, RevenueDetailComponent, RevenueUpdateComponent, RevenueDeleteDialogComponent],
  entryComponents: [RevenueDeleteDialogComponent],
})
export class RevenueModule {}
