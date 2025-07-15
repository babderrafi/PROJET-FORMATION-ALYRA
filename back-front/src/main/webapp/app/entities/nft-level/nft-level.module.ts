import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NFTLevelComponent } from './list/nft-level.component';
import { NFTLevelDetailComponent } from './detail/nft-level-detail.component';
import { NFTLevelUpdateComponent } from './update/nft-level-update.component';
import { NFTLevelDeleteDialogComponent } from './delete/nft-level-delete-dialog.component';
import { NFTLevelRoutingModule } from './route/nft-level-routing.module';

@NgModule({
  imports: [SharedModule, NFTLevelRoutingModule],
  declarations: [NFTLevelComponent, NFTLevelDetailComponent, NFTLevelUpdateComponent, NFTLevelDeleteDialogComponent],
  entryComponents: [NFTLevelDeleteDialogComponent],
})
export class NFTLevelModule {}
