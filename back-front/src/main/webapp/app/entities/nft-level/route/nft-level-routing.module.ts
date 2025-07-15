import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NFTLevelComponent } from '../list/nft-level.component';
import { NFTLevelDetailComponent } from '../detail/nft-level-detail.component';
import { NFTLevelUpdateComponent } from '../update/nft-level-update.component';
import { NFTLevelRoutingResolveService } from './nft-level-routing-resolve.service';

const nFTLevelRoute: Routes = [
  {
    path: '',
    component: NFTLevelComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NFTLevelDetailComponent,
    resolve: {
      nFTLevel: NFTLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NFTLevelUpdateComponent,
    resolve: {
      nFTLevel: NFTLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NFTLevelUpdateComponent,
    resolve: {
      nFTLevel: NFTLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nFTLevelRoute)],
  exports: [RouterModule],
})
export class NFTLevelRoutingModule {}
