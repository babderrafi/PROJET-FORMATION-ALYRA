import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDistribution, getDistributionIdentifier } from '../distribution.model';

export type EntityResponseType = HttpResponse<IDistribution>;
export type EntityArrayResponseType = HttpResponse<IDistribution[]>;

@Injectable({ providedIn: 'root' })
export class DistributionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/distributions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(distribution: IDistribution): Observable<EntityResponseType> {
    return this.http.post<IDistribution>(this.resourceUrl, distribution, { observe: 'response' });
  }

  update(distribution: IDistribution): Observable<EntityResponseType> {
    return this.http.put<IDistribution>(`${this.resourceUrl}/${getDistributionIdentifier(distribution) as number}`, distribution, {
      observe: 'response',
    });
  }

  partialUpdate(distribution: IDistribution): Observable<EntityResponseType> {
    return this.http.patch<IDistribution>(`${this.resourceUrl}/${getDistributionIdentifier(distribution) as number}`, distribution, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDistribution>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDistribution[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDistributionToCollectionIfMissing(
    distributionCollection: IDistribution[],
    ...distributionsToCheck: (IDistribution | null | undefined)[]
  ): IDistribution[] {
    const distributions: IDistribution[] = distributionsToCheck.filter(isPresent);
    if (distributions.length > 0) {
      const distributionCollectionIdentifiers = distributionCollection.map(
        distributionItem => getDistributionIdentifier(distributionItem)!
      );
      const distributionsToAdd = distributions.filter(distributionItem => {
        const distributionIdentifier = getDistributionIdentifier(distributionItem);
        if (distributionIdentifier == null || distributionCollectionIdentifiers.includes(distributionIdentifier)) {
          return false;
        }
        distributionCollectionIdentifiers.push(distributionIdentifier);
        return true;
      });
      return [...distributionsToAdd, ...distributionCollection];
    }
    return distributionCollection;
  }
}
