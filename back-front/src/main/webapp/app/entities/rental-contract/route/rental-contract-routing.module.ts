import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RentalContractComponent } from '../list/rental-contract.component';
import { RentalContractDetailComponent } from '../detail/rental-contract-detail.component';
import { RentalContractUpdateComponent } from '../update/rental-contract-update.component';
import { RentalContractRoutingResolveService } from './rental-contract-routing-resolve.service';

const rentalContractRoute: Routes = [
  {
    path: '',
    component: RentalContractComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RentalContractDetailComponent,
    resolve: {
      rentalContract: RentalContractRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RentalContractUpdateComponent,
    resolve: {
      rentalContract: RentalContractRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RentalContractUpdateComponent,
    resolve: {
      rentalContract: RentalContractRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rentalContractRoute)],
  exports: [RouterModule],
})
export class RentalContractRoutingModule {}
