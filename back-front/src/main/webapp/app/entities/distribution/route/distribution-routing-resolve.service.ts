import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDistribution, Distribution } from '../distribution.model';
import { DistributionService } from '../service/distribution.service';

@Injectable({ providedIn: 'root' })
export class DistributionRoutingResolveService implements Resolve<IDistribution> {
  constructor(protected service: DistributionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDistribution> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((distribution: HttpResponse<Distribution>) => {
          if (distribution.body) {
            return of(distribution.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Distribution());
  }
}
