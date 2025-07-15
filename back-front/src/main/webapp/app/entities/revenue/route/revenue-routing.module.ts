import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RevenueComponent } from '../list/revenue.component';
import { RevenueDetailComponent } from '../detail/revenue-detail.component';
import { RevenueUpdateComponent } from '../update/revenue-update.component';
import { RevenueRoutingResolveService } from './revenue-routing-resolve.service';

const revenueRoute: Routes = [
  {
    path: '',
    component: RevenueComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RevenueDetailComponent,
    resolve: {
      revenue: RevenueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RevenueUpdateComponent,
    resolve: {
      revenue: RevenueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RevenueUpdateComponent,
    resolve: {
      revenue: RevenueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(revenueRoute)],
  exports: [RouterModule],
})
export class RevenueRoutingModule {}
