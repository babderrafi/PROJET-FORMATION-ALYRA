import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INFTLevel, NFTLevel } from '../nft-level.model';

import { NFTLevelService } from './nft-level.service';

describe('NFTLevel Service', () => {
  let service: NFTLevelService;
  let httpMock: HttpTestingController;
  let elemDefault: INFTLevel;
  let expectedResult: INFTLevel | INFTLevel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NFTLevelService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      niveau: 'AAAAAAA',
      seuilLocation: 0,
      tauxFrais: 0,
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

    it('should create a NFTLevel', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NFTLevel()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NFTLevel', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          niveau: 'BBBBBB',
          seuilLocation: 1,
          tauxFrais: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NFTLevel', () => {
      const patchObject = Object.assign({}, new NFTLevel());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NFTLevel', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          niveau: 'BBBBBB',
          seuilLocation: 1,
          tauxFrais: 1,
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

    it('should delete a NFTLevel', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNFTLevelToCollectionIfMissing', () => {
      it('should add a NFTLevel to an empty array', () => {
        const nFTLevel: INFTLevel = { id: 123 };
        expectedResult = service.addNFTLevelToCollectionIfMissing([], nFTLevel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nFTLevel);
      });

      it('should not add a NFTLevel to an array that contains it', () => {
        const nFTLevel: INFTLevel = { id: 123 };
        const nFTLevelCollection: INFTLevel[] = [
          {
            ...nFTLevel,
          },
          { id: 456 },
        ];
        expectedResult = service.addNFTLevelToCollectionIfMissing(nFTLevelCollection, nFTLevel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NFTLevel to an array that doesn't contain it", () => {
        const nFTLevel: INFTLevel = { id: 123 };
        const nFTLevelCollection: INFTLevel[] = [{ id: 456 }];
        expectedResult = service.addNFTLevelToCollectionIfMissing(nFTLevelCollection, nFTLevel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nFTLevel);
      });

      it('should add only unique NFTLevel to an array', () => {
        const nFTLevelArray: INFTLevel[] = [{ id: 123 }, { id: 456 }, { id: 63344 }];
        const nFTLevelCollection: INFTLevel[] = [{ id: 123 }];
        expectedResult = service.addNFTLevelToCollectionIfMissing(nFTLevelCollection, ...nFTLevelArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nFTLevel: INFTLevel = { id: 123 };
        const nFTLevel2: INFTLevel = { id: 456 };
        expectedResult = service.addNFTLevelToCollectionIfMissing([], nFTLevel, nFTLevel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nFTLevel);
        expect(expectedResult).toContain(nFTLevel2);
      });

      it('should accept null and undefined values', () => {
        const nFTLevel: INFTLevel = { id: 123 };
        expectedResult = service.addNFTLevelToCollectionIfMissing([], null, nFTLevel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nFTLevel);
      });

      it('should return initial array if no NFTLevel is added', () => {
        const nFTLevelCollection: INFTLevel[] = [{ id: 123 }];
        expectedResult = service.addNFTLevelToCollectionIfMissing(nFTLevelCollection, undefined, null);
        expect(expectedResult).toEqual(nFTLevelCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
