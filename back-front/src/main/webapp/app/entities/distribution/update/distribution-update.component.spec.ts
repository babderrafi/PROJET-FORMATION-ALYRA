import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DistributionService } from '../service/distribution.service';
import { IDistribution, Distribution } from '../distribution.model';
import { IRevenue } from 'app/entities/revenue/revenue.model';
import { RevenueService } from 'app/entities/revenue/service/revenue.service';
import { IPart } from 'app/entities/part/part.model';
import { PartService } from 'app/entities/part/service/part.service';

import { DistributionUpdateComponent } from './distribution-update.component';

describe('Distribution Management Update Component', () => {
  let comp: DistributionUpdateComponent;
  let fixture: ComponentFixture<DistributionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let distributionService: DistributionService;
  let revenueService: RevenueService;
  let partService: PartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DistributionUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DistributionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DistributionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    distributionService = TestBed.inject(DistributionService);
    revenueService = TestBed.inject(RevenueService);
    partService = TestBed.inject(PartService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Revenue query and add missing value', () => {
      const distribution: IDistribution = { id: 456 };
      const revenue: IRevenue = { id: 56722 };
      distribution.revenue = revenue;

      const revenueCollection: IRevenue[] = [{ id: 95418 }];
      jest.spyOn(revenueService, 'query').mockReturnValue(of(new HttpResponse({ body: revenueCollection })));
      const additionalRevenues = [revenue];
      const expectedCollection: IRevenue[] = [...additionalRevenues, ...revenueCollection];
      jest.spyOn(revenueService, 'addRevenueToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ distribution });
      comp.ngOnInit();

      expect(revenueService.query).toHaveBeenCalled();
      expect(revenueService.addRevenueToCollectionIfMissing).toHaveBeenCalledWith(revenueCollection, ...additionalRevenues);
      expect(comp.revenuesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Part query and add missing value', () => {
      const distribution: IDistribution = { id: 456 };
      const part: IPart = { id: 33019 };
      distribution.part = part;

      const partCollection: IPart[] = [{ id: 2543 }];
      jest.spyOn(partService, 'query').mockReturnValue(of(new HttpResponse({ body: partCollection })));
      const additionalParts = [part];
      const expectedCollection: IPart[] = [...additionalParts, ...partCollection];
      jest.spyOn(partService, 'addPartToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ distribution });
      comp.ngOnInit();

      expect(partService.query).toHaveBeenCalled();
      expect(partService.addPartToCollectionIfMissing).toHaveBeenCalledWith(partCollection, ...additionalParts);
      expect(comp.partsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const distribution: IDistribution = { id: 456 };
      const revenue: IRevenue = { id: 12795 };
      distribution.revenue = revenue;
      const part: IPart = { id: 46241 };
      distribution.part = part;

      activatedRoute.data = of({ distribution });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(distribution));
      expect(comp.revenuesSharedCollection).toContain(revenue);
      expect(comp.partsSharedCollection).toContain(part);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Distribution>>();
      const distribution = { id: 123 };
      jest.spyOn(distributionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ distribution });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: distribution }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(distributionService.update).toHaveBeenCalledWith(distribution);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Distribution>>();
      const distribution = new Distribution();
      jest.spyOn(distributionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ distribution });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: distribution }));
      saveSubject.complete();

      // THEN
      expect(distributionService.create).toHaveBeenCalledWith(distribution);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Distribution>>();
      const distribution = { id: 123 };
      jest.spyOn(distributionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ distribution });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(distributionService.update).toHaveBeenCalledWith(distribution);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackRevenueById', () => {
      it('Should return tracked Revenue primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRevenueById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPartById', () => {
      it('Should return tracked Part primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPartById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
