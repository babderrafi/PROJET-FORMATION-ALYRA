import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRevenue, Revenue } from '../revenue.model';

import { RevenueService } from './revenue.service';

describe('Revenue Service', () => {
  let service: RevenueService;
  let httpMock: HttpTestingController;
  let elemDefault: IRevenue;
  let expectedResult: IRevenue | IRevenue[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RevenueService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      month: currentDate,
      amountEur: 0,
      amountUsdc: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          month: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Revenue', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          month: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          month: currentDate,
        },
        returnedFromService
      );

      service.create(new Revenue()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Revenue', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          month: currentDate.format(DATE_TIME_FORMAT),
          amountEur: 1,
          amountUsdc: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          month: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Revenue', () => {
      const patchObject = Object.assign(
        {
          month: currentDate.format(DATE_TIME_FORMAT),
          amountEur: 1,
          amountUsdc: 1,
        },
        new Revenue()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          month: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Revenue', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          month: currentDate.format(DATE_TIME_FORMAT),
          amountEur: 1,
          amountUsdc: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          month: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Revenue', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRevenueToCollectionIfMissing', () => {
      it('should add a Revenue to an empty array', () => {
        const revenue: IRevenue = { id: 123 };
        expectedResult = service.addRevenueToCollectionIfMissing([], revenue);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(revenue);
      });

      it('should not add a Revenue to an array that contains it', () => {
        const revenue: IRevenue = { id: 123 };
        const revenueCollection: IRevenue[] = [
          {
            ...revenue,
          },
          { id: 456 },
        ];
        expectedResult = service.addRevenueToCollectionIfMissing(revenueCollection, revenue);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Revenue to an array that doesn't contain it", () => {
        const revenue: IRevenue = { id: 123 };
        const revenueCollection: IRevenue[] = [{ id: 456 }];
        expectedResult = service.addRevenueToCollectionIfMissing(revenueCollection, revenue);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(revenue);
      });

      it('should add only unique Revenue to an array', () => {
        const revenueArray: IRevenue[] = [{ id: 123 }, { id: 456 }, { id: 91184 }];
        const revenueCollection: IRevenue[] = [{ id: 123 }];
        expectedResult = service.addRevenueToCollectionIfMissing(revenueCollection, ...revenueArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const revenue: IRevenue = { id: 123 };
        const revenue2: IRevenue = { id: 456 };
        expectedResult = service.addRevenueToCollectionIfMissing([], revenue, revenue2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(revenue);
        expect(expectedResult).toContain(revenue2);
      });

      it('should accept null and undefined values', () => {
        const revenue: IRevenue = { id: 123 };
        expectedResult = service.addRevenueToCollectionIfMissing([], null, revenue, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(revenue);
      });

      it('should return initial array if no Revenue is added', () => {
        const revenueCollection: IRevenue[] = [{ id: 123 }];
        expectedResult = service.addRevenueToCollectionIfMissing(revenueCollection, undefined, null);
        expect(expectedResult).toEqual(revenueCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
