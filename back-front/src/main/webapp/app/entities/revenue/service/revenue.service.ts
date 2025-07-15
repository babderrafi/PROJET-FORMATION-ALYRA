import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRevenue, getRevenueIdentifier } from '../revenue.model';

export type EntityResponseType = HttpResponse<IRevenue>;
export type EntityArrayResponseType = HttpResponse<IRevenue[]>;

@Injectable({ providedIn: 'root' })
export class RevenueService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/revenues');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(revenue: IRevenue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(revenue);
    return this.http
      .post<IRevenue>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(revenue: IRevenue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(revenue);
    return this.http
      .put<IRevenue>(`${this.resourceUrl}/${getRevenueIdentifier(revenue) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(revenue: IRevenue): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(revenue);
    return this.http
      .patch<IRevenue>(`${this.resourceUrl}/${getRevenueIdentifier(revenue) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRevenue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRevenue[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRevenueToCollectionIfMissing(revenueCollection: IRevenue[], ...revenuesToCheck: (IRevenue | null | undefined)[]): IRevenue[] {
    const revenues: IRevenue[] = revenuesToCheck.filter(isPresent);
    if (revenues.length > 0) {
      const revenueCollectionIdentifiers = revenueCollection.map(revenueItem => getRevenueIdentifier(revenueItem)!);
      const revenuesToAdd = revenues.filter(revenueItem => {
        const revenueIdentifier = getRevenueIdentifier(revenueItem);
        if (revenueIdentifier == null || revenueCollectionIdentifiers.includes(revenueIdentifier)) {
          return false;
        }
        revenueCollectionIdentifiers.push(revenueIdentifier);
        return true;
      });
      return [...revenuesToAdd, ...revenueCollection];
    }
    return revenueCollection;
  }

  protected convertDateFromClient(revenue: IRevenue): IRevenue {
    return Object.assign({}, revenue, {
      month: revenue.month?.isValid() ? revenue.month.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.month = res.body.month ? dayjs(res.body.month) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((revenue: IRevenue) => {
        revenue.month = revenue.month ? dayjs(revenue.month) : undefined;
      });
    }
    return res;
  }
}
