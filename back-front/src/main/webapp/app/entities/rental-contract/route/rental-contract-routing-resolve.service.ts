import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRentalContract, RentalContract } from '../rental-contract.model';
import { RentalContractService } from '../service/rental-contract.service';

@Injectable({ providedIn: 'root' })
export class RentalContractRoutingResolveService implements Resolve<IRentalContract> {
  constructor(protected service: RentalContractService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRentalContract> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((rentalContract: HttpResponse<RentalContract>) => {
          if (rentalContract.body) {
            return of(rentalContract.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RentalContract());
  }
}
