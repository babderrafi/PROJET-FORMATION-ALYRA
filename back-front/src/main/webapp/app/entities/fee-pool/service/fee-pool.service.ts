import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFeePool, getFeePoolIdentifier } from '../fee-pool.model';

export type EntityResponseType = HttpResponse<IFeePool>;
export type EntityArrayResponseType = HttpResponse<IFeePool[]>;

@Injectable({ providedIn: 'root' })
export class FeePoolService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fee-pools');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(feePool: IFeePool): Observable<EntityResponseType> {
    return this.http.post<IFeePool>(this.resourceUrl, feePool, { observe: 'response' });
  }

  update(feePool: IFeePool): Observable<EntityResponseType> {
    return this.http.put<IFeePool>(`${this.resourceUrl}/${getFeePoolIdentifier(feePool) as number}`, feePool, { observe: 'response' });
  }

  partialUpdate(feePool: IFeePool): Observable<EntityResponseType> {
    return this.http.patch<IFeePool>(`${this.resourceUrl}/${getFeePoolIdentifier(feePool) as number}`, feePool, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFeePool>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFeePool[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFeePoolToCollectionIfMissing(feePoolCollection: IFeePool[], ...feePoolsToCheck: (IFeePool | null | undefined)[]): IFeePool[] {
    const feePools: IFeePool[] = feePoolsToCheck.filter(isPresent);
    if (feePools.length > 0) {
      const feePoolCollectionIdentifiers = feePoolCollection.map(feePoolItem => getFeePoolIdentifier(feePoolItem)!);
      const feePoolsToAdd = feePools.filter(feePoolItem => {
        const feePoolIdentifier = getFeePoolIdentifier(feePoolItem);
        if (feePoolIdentifier == null || feePoolCollectionIdentifiers.includes(feePoolIdentifier)) {
          return false;
        }
        feePoolCollectionIdentifiers.push(feePoolIdentifier);
        return true;
      });
      return [...feePoolsToAdd, ...feePoolCollection];
    }
    return feePoolCollection;
  }
}
