import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFeePool, FeePool } from '../fee-pool.model';

import { FeePoolService } from './fee-pool.service';

describe('FeePool Service', () => {
  let service: FeePoolService;
  let httpMock: HttpTestingController;
  let elemDefault: IFeePool;
  let expectedResult: IFeePool | IFeePool[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FeePoolService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      montantCollecte: 0,
      montantRedistribue: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a FeePool', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new FeePool()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FeePool', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          montantCollecte: 1,
          montantRedistribue: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FeePool', () => {
      const patchObject = Object.assign(
        {
          montantRedistribue: 1,
        },
        new FeePool()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FeePool', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          montantCollecte: 1,
          montantRedistribue: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a FeePool', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFeePoolToCollectionIfMissing', () => {
      it('should add a FeePool to an empty array', () => {
        const feePool: IFeePool = { id: 123 };
        expectedResult = service.addFeePoolToCollectionIfMissing([], feePool);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(feePool);
      });

      it('should not add a FeePool to an array that contains it', () => {
        const feePool: IFeePool = { id: 123 };
        const feePoolCollection: IFeePool[] = [
          {
            ...feePool,
          },
          { id: 456 },
        ];
        expectedResult = service.addFeePoolToCollectionIfMissing(feePoolCollection, feePool);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FeePool to an array that doesn't contain it", () => {
        const feePool: IFeePool = { id: 123 };
        const feePoolCollection: IFeePool[] = [{ id: 456 }];
        expectedResult = service.addFeePoolToCollectionIfMissing(feePoolCollection, feePool);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(feePool);
      });

      it('should add only unique FeePool to an array', () => {
        const feePoolArray: IFeePool[] = [{ id: 123 }, { id: 456 }, { id: 69745 }];
        const feePoolCollection: IFeePool[] = [{ id: 123 }];
        expectedResult = service.addFeePoolToCollectionIfMissing(feePoolCollection, ...feePoolArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const feePool: IFeePool = { id: 123 };
        const feePool2: IFeePool = { id: 456 };
        expectedResult = service.addFeePoolToCollectionIfMissing([], feePool, feePool2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(feePool);
        expect(expectedResult).toContain(feePool2);
      });

      it('should accept null and undefined values', () => {
        const feePool: IFeePool = { id: 123 };
        expectedResult = service.addFeePoolToCollectionIfMissing([], null, feePool, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(feePool);
      });

      it('should return initial array if no FeePool is added', () => {
        const feePoolCollection: IFeePool[] = [{ id: 123 }];
        expectedResult = service.addFeePoolToCollectionIfMissing(feePoolCollection, undefined, null);
        expect(expectedResult).toEqual(feePoolCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
