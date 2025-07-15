import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { StatutContrat } from 'app/entities/enumerations/statut-contrat.model';
import { IRentalContract, RentalContract } from '../rental-contract.model';

import { RentalContractService } from './rental-contract.service';

describe('RentalContract Service', () => {
  let service: RentalContractService;
  let httpMock: HttpTestingController;
  let elemDefault: IRentalContract;
  let expectedResult: IRentalContract | IRentalContract[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RentalContractService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      dateDebut: currentDate,
      dateFin: currentDate,
      statut: StatutContrat.EN_ATTENTE_SIGNATURE,
      fraisAppliques: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateDebut: currentDate.format(DATE_TIME_FORMAT),
          dateFin: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a RentalContract', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateDebut: currentDate.format(DATE_TIME_FORMAT),
          dateFin: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDebut: currentDate,
          dateFin: currentDate,
        },
        returnedFromService
      );

      service.create(new RentalContract()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RentalContract', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateDebut: currentDate.format(DATE_TIME_FORMAT),
          dateFin: currentDate.format(DATE_TIME_FORMAT),
          statut: 'BBBBBB',
          fraisAppliques: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDebut: currentDate,
          dateFin: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RentalContract', () => {
      const patchObject = Object.assign(
        {
          dateFin: currentDate.format(DATE_TIME_FORMAT),
        },
        new RentalContract()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateDebut: currentDate,
          dateFin: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RentalContract', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateDebut: currentDate.format(DATE_TIME_FORMAT),
          dateFin: currentDate.format(DATE_TIME_FORMAT),
          statut: 'BBBBBB',
          fraisAppliques: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDebut: currentDate,
          dateFin: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a RentalContract', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRentalContractToCollectionIfMissing', () => {
      it('should add a RentalContract to an empty array', () => {
        const rentalContract: IRentalContract = { id: 123 };
        expectedResult = service.addRentalContractToCollectionIfMissing([], rentalContract);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rentalContract);
      });

      it('should not add a RentalContract to an array that contains it', () => {
        const rentalContract: IRentalContract = { id: 123 };
        const rentalContractCollection: IRentalContract[] = [
          {
            ...rentalContract,
          },
          { id: 456 },
        ];
        expectedResult = service.addRentalContractToCollectionIfMissing(rentalContractCollection, rentalContract);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RentalContract to an array that doesn't contain it", () => {
        const rentalContract: IRentalContract = { id: 123 };
        const rentalContractCollection: IRentalContract[] = [{ id: 456 }];
        expectedResult = service.addRentalContractToCollectionIfMissing(rentalContractCollection, rentalContract);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rentalContract);
      });

      it('should add only unique RentalContract to an array', () => {
        const rentalContractArray: IRentalContract[] = [{ id: 123 }, { id: 456 }, { id: 80834 }];
        const rentalContractCollection: IRentalContract[] = [{ id: 123 }];
        expectedResult = service.addRentalContractToCollectionIfMissing(rentalContractCollection, ...rentalContractArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rentalContract: IRentalContract = { id: 123 };
        const rentalContract2: IRentalContract = { id: 456 };
        expectedResult = service.addRentalContractToCollectionIfMissing([], rentalContract, rentalContract2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rentalContract);
        expect(expectedResult).toContain(rentalContract2);
      });

      it('should accept null and undefined values', () => {
        const rentalContract: IRentalContract = { id: 123 };
        expectedResult = service.addRentalContractToCollectionIfMissing([], null, rentalContract, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rentalContract);
      });

      it('should return initial array if no RentalContract is added', () => {
        const rentalContractCollection: IRentalContract[] = [{ id: 123 }];
        expectedResult = service.addRentalContractToCollectionIfMissing(rentalContractCollection, undefined, null);
        expect(expectedResult).toEqual(rentalContractCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
