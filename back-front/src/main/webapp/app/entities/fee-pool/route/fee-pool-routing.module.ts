import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FeePoolComponent } from '../list/fee-pool.component';
import { FeePoolDetailComponent } from '../detail/fee-pool-detail.component';
import { FeePoolUpdateComponent } from '../update/fee-pool-update.component';
import { FeePoolRoutingResolveService } from './fee-pool-routing-resolve.service';

const feePoolRoute: Routes = [
  {
    path: '',
    component: FeePoolComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FeePoolDetailComponent,
    resolve: {
      feePool: FeePoolRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FeePoolUpdateComponent,
    resolve: {
      feePool: FeePoolRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FeePoolUpdateComponent,
    resolve: {
      feePool: FeePoolRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(feePoolRoute)],
  exports: [RouterModule],
})
export class FeePoolRoutingModule {}
