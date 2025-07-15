import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDistribution, Distribution } from '../distribution.model';

import { DistributionService } from './distribution.service';

describe('Distribution Service', () => {
  let service: DistributionService;
  let httpMock: HttpTestingController;
  let elemDefault: IDistribution;
  let expectedResult: IDistribution | IDistribution[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DistributionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      amountUsdc: 0,
      status: 'AAAAAAA',
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

    it('should create a Distribution', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Distribution()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Distribution', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          amountUsdc: 1,
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Distribution', () => {
      const patchObject = Object.assign(
        {
          amountUsdc: 1,
        },
        new Distribution()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Distribution', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          amountUsdc: 1,
          status: 'BBBBBB',
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

    it('should delete a Distribution', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDistributionToCollectionIfMissing', () => {
      it('should add a Distribution to an empty array', () => {
        const distribution: IDistribution = { id: 123 };
        expectedResult = service.addDistributionToCollectionIfMissing([], distribution);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(distribution);
      });

      it('should not add a Distribution to an array that contains it', () => {
        const distribution: IDistribution = { id: 123 };
        const distributionCollection: IDistribution[] = [
          {
            ...distribution,
          },
          { id: 456 },
        ];
        expectedResult = service.addDistributionToCollectionIfMissing(distributionCollection, distribution);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Distribution to an array that doesn't contain it", () => {
        const distribution: IDistribution = { id: 123 };
        const distributionCollection: IDistribution[] = [{ id: 456 }];
        expectedResult = service.addDistributionToCollectionIfMissing(distributionCollection, distribution);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(distribution);
      });

      it('should add only unique Distribution to an array', () => {
        const distributionArray: IDistribution[] = [{ id: 123 }, { id: 456 }, { id: 97089 }];
        const distributionCollection: IDistribution[] = [{ id: 123 }];
        expectedResult = service.addDistributionToCollectionIfMissing(distributionCollection, ...distributionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const distribution: IDistribution = { id: 123 };
        const distribution2: IDistribution = { id: 456 };
        expectedResult = service.addDistributionToCollectionIfMissing([], distribution, distribution2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(distribution);
        expect(expectedResult).toContain(distribution2);
      });

      it('should accept null and undefined values', () => {
        const distribution: IDistribution = { id: 123 };
        expectedResult = service.addDistributionToCollectionIfMissing([], null, distribution, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(distribution);
      });

      it('should return initial array if no Distribution is added', () => {
        const distributionCollection: IDistribution[] = [{ id: 123 }];
        expectedResult = service.addDistributionToCollectionIfMissing(distributionCollection, undefined, null);
        expect(expectedResult).toEqual(distributionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
