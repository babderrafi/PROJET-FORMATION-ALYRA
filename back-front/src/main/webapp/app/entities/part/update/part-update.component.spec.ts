import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PartService } from '../service/part.service';
import { IPart, Part } from '../part.model';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';

import { PartUpdateComponent } from './part-update.component';

describe('Part Management Update Component', () => {
  let comp: PartUpdateComponent;
  let fixture: ComponentFixture<PartUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let partService: PartService;
  let carService: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PartUpdateComponent],
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
      .overrideTemplate(PartUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    partService = TestBed.inject(PartService);
    carService = TestBed.inject(CarService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Car query and add missing value', () => {
      const part: IPart = { id: 456 };
      const car: ICar = { id: 25986 };
      part.car = car;

      const carCollection: ICar[] = [{ id: 74426 }];
      jest.spyOn(carService, 'query').mockReturnValue(of(new HttpResponse({ body: carCollection })));
      const additionalCars = [car];
      const expectedCollection: ICar[] = [...additionalCars, ...carCollection];
      jest.spyOn(carService, 'addCarToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ part });
      comp.ngOnInit();

      expect(carService.query).toHaveBeenCalled();
      expect(carService.addCarToCollectionIfMissing).toHaveBeenCalledWith(carCollection, ...additionalCars);
      expect(comp.carsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const part: IPart = { id: 456 };
      const car: ICar = { id: 12610 };
      part.car = car;

      activatedRoute.data = of({ part });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(part));
      expect(comp.carsSharedCollection).toContain(car);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Part>>();
      const part = { id: 123 };
      jest.spyOn(partService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ part });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: part }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(partService.update).toHaveBeenCalledWith(part);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Part>>();
      const part = new Part();
      jest.spyOn(partService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ part });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: part }));
      saveSubject.complete();

      // THEN
      expect(partService.create).toHaveBeenCalledWith(part);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Part>>();
      const part = { id: 123 };
      jest.spyOn(partService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ part });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(partService.update).toHaveBeenCalledWith(part);
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
