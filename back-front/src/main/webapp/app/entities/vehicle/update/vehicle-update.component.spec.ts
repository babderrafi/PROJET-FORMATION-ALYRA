import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VehicleService } from '../service/vehicle.service';
import { IVehicle, Vehicle } from '../vehicle.model';
import { IUserExtended } from 'app/entities/user-extended/user-extended.model';
import { UserExtendedService } from 'app/entities/user-extended/service/user-extended.service';

import { VehicleUpdateComponent } from './vehicle-update.component';

describe('Vehicle Management Update Component', () => {
  let comp: VehicleUpdateComponent;
  let fixture: ComponentFixture<VehicleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vehicleService: VehicleService;
  let userExtendedService: UserExtendedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VehicleUpdateComponent],
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
      .overrideTemplate(VehicleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VehicleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vehicleService = TestBed.inject(VehicleService);
    userExtendedService = TestBed.inject(UserExtendedService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UserExtended query and add missing value', () => {
      const vehicle: IVehicle = { id: 456 };
      const loueur: IUserExtended = { id: 3406 };
      vehicle.loueur = loueur;

      const userExtendedCollection: IUserExtended[] = [{ id: 25301 }];
      jest.spyOn(userExtendedService, 'query').mockReturnValue(of(new HttpResponse({ body: userExtendedCollection })));
      const additionalUserExtendeds = [loueur];
      const expectedCollection: IUserExtended[] = [...additionalUserExtendeds, ...userExtendedCollection];
      jest.spyOn(userExtendedService, 'addUserExtendedToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ vehicle });
      comp.ngOnInit();

      expect(userExtendedService.query).toHaveBeenCalled();
      expect(userExtendedService.addUserExtendedToCollectionIfMissing).toHaveBeenCalledWith(
        userExtendedCollection,
        ...additionalUserExtendeds
      );
      expect(comp.userExtendedsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const vehicle: IVehicle = { id: 456 };
      const loueur: IUserExtended = { id: 42993 };
      vehicle.loueur = loueur;

      activatedRoute.data = of({ vehicle });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(vehicle));
      expect(comp.userExtendedsSharedCollection).toContain(loueur);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Vehicle>>();
      const vehicle = { id: 123 };
      jest.spyOn(vehicleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vehicle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vehicle }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(vehicleService.update).toHaveBeenCalledWith(vehicle);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Vehicle>>();
      const vehicle = new Vehicle();
      jest.spyOn(vehicleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vehicle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vehicle }));
      saveSubject.complete();

      // THEN
      expect(vehicleService.create).toHaveBeenCalledWith(vehicle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Vehicle>>();
      const vehicle = { id: 123 };
      jest.spyOn(vehicleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vehicle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vehicleService.update).toHaveBeenCalledWith(vehicle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUserExtendedById', () => {
      it('Should return tracked UserExtended primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserExtendedById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
