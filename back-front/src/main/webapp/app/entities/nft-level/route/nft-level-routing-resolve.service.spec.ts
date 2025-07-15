import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { INFTLevel, NFTLevel } from '../nft-level.model';
import { NFTLevelService } from '../service/nft-level.service';

import { NFTLevelRoutingResolveService } from './nft-level-routing-resolve.service';

describe('NFTLevel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: NFTLevelRoutingResolveService;
  let service: NFTLevelService;
  let resultNFTLevel: INFTLevel | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(NFTLevelRoutingResolveService);
    service = TestBed.inject(NFTLevelService);
    resultNFTLevel = undefined;
  });

  describe('resolve', () => {
    it('should return INFTLevel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNFTLevel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNFTLevel).toEqual({ id: 123 });
    });

    it('should return new INFTLevel if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNFTLevel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNFTLevel).toEqual(new NFTLevel());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NFTLevel })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNFTLevel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNFTLevel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
