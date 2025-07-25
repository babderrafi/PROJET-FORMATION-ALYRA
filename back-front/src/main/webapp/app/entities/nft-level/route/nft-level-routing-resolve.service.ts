import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INFTLevel, NFTLevel } from '../nft-level.model';
import { NFTLevelService } from '../service/nft-level.service';

@Injectable({ providedIn: 'root' })
export class NFTLevelRoutingResolveService implements Resolve<INFTLevel> {
  constructor(protected service: NFTLevelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INFTLevel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nFTLevel: HttpResponse<NFTLevel>) => {
          if (nFTLevel.body) {
            return of(nFTLevel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NFTLevel());
  }
}
