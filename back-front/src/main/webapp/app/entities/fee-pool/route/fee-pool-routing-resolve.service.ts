import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFeePool, FeePool } from '../fee-pool.model';
import { FeePoolService } from '../service/fee-pool.service';

@Injectable({ providedIn: 'root' })
export class FeePoolRoutingResolveService implements Resolve<IFeePool> {
  constructor(protected service: FeePoolService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFeePool> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((feePool: HttpResponse<FeePool>) => {
          if (feePool.body) {
            return of(feePool.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FeePool());
  }
}
