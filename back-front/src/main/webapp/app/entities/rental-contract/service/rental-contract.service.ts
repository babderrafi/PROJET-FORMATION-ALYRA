import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRentalContract, getRentalContractIdentifier } from '../rental-contract.model';

export type EntityResponseType = HttpResponse<IRentalContract>;
export type EntityArrayResponseType = HttpResponse<IRentalContract[]>;

@Injectable({ providedIn: 'root' })
export class RentalContractService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rental-contracts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(rentalContract: IRentalContract): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rentalContract);
    return this.http
      .post<IRentalContract>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rentalContract: IRentalContract): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rentalContract);
    return this.http
      .put<IRentalContract>(`${this.resourceUrl}/${getRentalContractIdentifier(rentalContract) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(rentalContract: IRentalContract): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rentalContract);
    return this.http
      .patch<IRentalContract>(`${this.resourceUrl}/${getRentalContractIdentifier(rentalContract) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRentalContract>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRentalContract[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRentalContractToCollectionIfMissing(
    rentalContractCollection: IRentalContract[],
    ...rentalContractsToCheck: (IRentalContract | null | undefined)[]
  ): IRentalContract[] {
    const rentalContracts: IRentalContract[] = rentalContractsToCheck.filter(isPresent);
    if (rentalContracts.length > 0) {
      const rentalContractCollectionIdentifiers = rentalContractCollection.map(
        rentalContractItem => getRentalContractIdentifier(rentalContractItem)!
      );
      const rentalContractsToAdd = rentalContracts.filter(rentalContractItem => {
        const rentalContractIdentifier = getRentalContractIdentifier(rentalContractItem);
        if (rentalContractIdentifier == null || rentalContractCollectionIdentifiers.includes(rentalContractIdentifier)) {
          return false;
        }
        rentalContractCollectionIdentifiers.push(rentalContractIdentifier);
        return true;
      });
      return [...rentalContractsToAdd, ...rentalContractCollection];
    }
    return rentalContractCollection;
  }

  protected convertDateFromClient(rentalContract: IRentalContract): IRentalContract {
    return Object.assign({}, rentalContract, {
      dateDebut: rentalContract.dateDebut?.isValid() ? rentalContract.dateDebut.toJSON() : undefined,
      dateFin: rentalContract.dateFin?.isValid() ? rentalContract.dateFin.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? dayjs(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? dayjs(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rentalContract: IRentalContract) => {
        rentalContract.dateDebut = rentalContract.dateDebut ? dayjs(rentalContract.dateDebut) : undefined;
        rentalContract.dateFin = rentalContract.dateFin ? dayjs(rentalContract.dateFin) : undefined;
      });
    }
    return res;
  }
}
