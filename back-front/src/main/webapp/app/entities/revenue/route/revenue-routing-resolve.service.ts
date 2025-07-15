import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRevenue, Revenue } from '../revenue.model';
import { RevenueService } from '../service/revenue.service';

@Injectable({ providedIn: 'root' })
export class RevenueRoutingResolveService implements Resolve<IRevenue> {
  constructor(protected service: RevenueService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRevenue> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((revenue: HttpResponse<Revenue>) => {
          if (revenue.body) {
            return of(revenue.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Revenue());
  }
}
