import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRentalContract, RentalContract } from '../rental-contract.model';
import { RentalContractService } from '../service/rental-contract.service';

import { RentalContractRoutingResolveService } from './rental-contract-routing-resolve.service';

describe('RentalContract routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RentalContractRoutingResolveService;
  let service: RentalContractService;
  let resultRentalContract: IRentalContract | undefined;

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
    routingResolveService = TestBed.inject(RentalContractRoutingResolveService);
    service = TestBed.inject(RentalContractService);
    resultRentalContract = undefined;
  });

  describe('resolve', () => {
    it('should return IRentalContract returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRentalContract = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRentalContract).toEqual({ id: 123 });
    });

    it('should return new IRentalContract if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRentalContract = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRentalContract).toEqual(new RentalContract());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RentalContract })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRentalContract = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRentalContract).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
