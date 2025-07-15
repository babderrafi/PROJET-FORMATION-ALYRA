import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RevenueService } from '../service/revenue.service';
import { IRevenue, Revenue } from '../revenue.model';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';

import { RevenueUpdateComponent } from './revenue-update.component';

describe('Revenue Management Update Component', () => {
  let comp: RevenueUpdateComponent;
  let fixture: ComponentFixture<RevenueUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let revenueService: RevenueService;
  let carService: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RevenueUpdateComponent],
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
      .overrideTemplate(RevenueUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RevenueUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    revenueService = TestBed.inject(RevenueService);
    carService = TestBed.inject(CarService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Car query and add missing value', () => {
      const revenue: IRevenue = { id: 456 };
      const car: ICar = { id: 25071 };
      revenue.car = car;

      const carCollection: ICar[] = [{ id: 60024 }];
      jest.spyOn(carService, 'query').mockReturnValue(of(new HttpResponse({ body: carCollection })));
      const additionalCars = [car];
      const expectedCollection: ICar[] = [...additionalCars, ...carCollection];
      jest.spyOn(carService, 'addCarToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ revenue });
      comp.ngOnInit();

      expect(carService.query).toHaveBeenCalled();
      expect(carService.addCarToCollectionIfMissing).toHaveBeenCalledWith(carCollection, ...additionalCars);
      expect(comp.carsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const revenue: IRevenue = { id: 456 };
      const car: ICar = { id: 96689 };
      revenue.car = car;

      activatedRoute.data = of({ revenue });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(revenue));
      expect(comp.carsSharedCollection).toContain(car);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Revenue>>();
      const revenue = { id: 123 };
      jest.spyOn(revenueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ revenue });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: revenue }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(revenueService.update).toHaveBeenCalledWith(revenue);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Revenue>>();
      const revenue = new Revenue();
      jest.spyOn(revenueService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ revenue });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: revenue }));
      saveSubject.complete();

      // THEN
      expect(revenueService.create).toHaveBeenCalledWith(revenue);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Revenue>>();
      const revenue = { id: 123 };
      jest.spyOn(revenueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ revenue });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(revenueService.update).toHaveBeenCalledWith(revenue);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackCarById', () => {
      it('Should return tracked Car primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCarById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
