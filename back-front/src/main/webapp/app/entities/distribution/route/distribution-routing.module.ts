import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DistributionComponent } from '../list/distribution.component';
import { DistributionDetailComponent } from '../detail/distribution-detail.component';
import { DistributionUpdateComponent } from '../update/distribution-update.component';
import { DistributionRoutingResolveService } from './distribution-routing-resolve.service';

const distributionRoute: Routes = [
  {
    path: '',
    component: DistributionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DistributionDetailComponent,
    resolve: {
      distribution: DistributionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DistributionUpdateComponent,
    resolve: {
      distribution: DistributionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DistributionUpdateComponent,
    resolve: {
      distribution: DistributionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(distributionRoute)],
  exports: [RouterModule],
})
export class DistributionRoutingModule {}
