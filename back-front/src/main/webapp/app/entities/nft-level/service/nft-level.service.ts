import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INFTLevel, getNFTLevelIdentifier } from '../nft-level.model';

export type EntityResponseType = HttpResponse<INFTLevel>;
export type EntityArrayResponseType = HttpResponse<INFTLevel[]>;

@Injectable({ providedIn: 'root' })
export class NFTLevelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nft-levels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nFTLevel: INFTLevel): Observable<EntityResponseType> {
    return this.http.post<INFTLevel>(this.resourceUrl, nFTLevel, { observe: 'response' });
  }

  update(nFTLevel: INFTLevel): Observable<EntityResponseType> {
    return this.http.put<INFTLevel>(`${this.resourceUrl}/${getNFTLevelIdentifier(nFTLevel) as number}`, nFTLevel, { observe: 'response' });
  }

  partialUpdate(nFTLevel: INFTLevel): Observable<EntityResponseType> {
    return this.http.patch<INFTLevel>(`${this.resourceUrl}/${getNFTLevelIdentifier(nFTLevel) as number}`, nFTLevel, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INFTLevel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INFTLevel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNFTLevelToCollectionIfMissing(nFTLevelCollection: INFTLevel[], ...nFTLevelsToCheck: (INFTLevel | null | undefined)[]): INFTLevel[] {
    const nFTLevels: INFTLevel[] = nFTLevelsToCheck.filter(isPresent);
    if (nFTLevels.length > 0) {
      const nFTLevelCollectionIdentifiers = nFTLevelCollection.map(nFTLevelItem => getNFTLevelIdentifier(nFTLevelItem)!);
      const nFTLevelsToAdd = nFTLevels.filter(nFTLevelItem => {
        const nFTLevelIdentifier = getNFTLevelIdentifier(nFTLevelItem);
        if (nFTLevelIdentifier == null || nFTLevelCollectionIdentifiers.includes(nFTLevelIdentifier)) {
          return false;
        }
        nFTLevelCollectionIdentifiers.push(nFTLevelIdentifier);
        return true;
      });
      return [...nFTLevelsToAdd, ...nFTLevelCollection];
    }
    return nFTLevelCollection;
  }
}
