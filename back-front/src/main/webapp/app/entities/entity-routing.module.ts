import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'car',
        data: { pageTitle: 'Cars' },
        loadChildren: () => import('./car/car.module').then(m => m.CarModule),
      },
      {
        path: 'part',
        data: { pageTitle: 'Parts' },
        loadChildren: () => import('./part/part.module').then(m => m.PartModule),
      },
      {
        path: 'revenue',
        data: { pageTitle: 'Revenues' },
        loadChildren: () => import('./revenue/revenue.module').then(m => m.RevenueModule),
      },
      {
        path: 'distribution',
        data: { pageTitle: 'Distributions' },
        loadChildren: () => import('./distribution/distribution.module').then(m => m.DistributionModule),
      },
      {
        path: 'user-extended',
        data: { pageTitle: 'UserExtendeds' },
        loadChildren: () => import('./user-extended/user-extended.module').then(m => m.UserExtendedModule),
      },
      {
        path: 'vehicle',
        data: { pageTitle: 'Vehicles' },
        loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule),
      },
      {
        path: 'rental-contract',
        data: { pageTitle: 'RentalContracts' },
        loadChildren: () => import('./rental-contract/rental-contract.module').then(m => m.RentalContractModule),
      },
      {
        path: 'nft-level',
        data: { pageTitle: 'NFTLevels' },
        loadChildren: () => import('./nft-level/nft-level.module').then(m => m.NFTLevelModule),
      },
      {
        path: 'fee-pool',
        data: { pageTitle: 'FeePools' },
        loadChildren: () => import('./fee-pool/fee-pool.module').then(m => m.FeePoolModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
