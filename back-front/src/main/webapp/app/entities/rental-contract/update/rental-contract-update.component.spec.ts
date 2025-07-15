import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RentalContractService } from '../service/rental-contract.service';
import { IRentalContract, RentalContract } from '../rental-contract.model';
import { IVehicle } from 'app/entities/vehicle/vehicle.model';
import { VehicleService } from 'app/entities/vehicle/service/vehicle.service';
import { IUserExtended } from 'app/entities/user-extended/user-extended.model';
import { UserExtendedService } from 'app/entities/user-extended/service/user-extended.service';

import { RentalContractUpdateComponent } from './rental-contract-update.component';

describe('RentalContract Management Update Component', () => {
  let comp: RentalContractUpdateComponent;
  let fixture: ComponentFixture<RentalContractUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rentalContractService: RentalContractService;
  let vehicleService: VehicleService;
  let userExtendedService: UserExtendedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RentalContractUpdateComponent],
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
      .overrideTemplate(RentalContractUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RentalContractUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rentalContractService = TestBed.inject(RentalContractService);
    vehicleService = TestBed.inject(VehicleService);
    userExtendedService = TestBed.inject(UserExtendedService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Vehicle query and add missing value', () => {
      const rentalContract: IRentalContract = { id: 456 };
      const vehicle: IVehicle = { id: 24248 };
      rentalContract.vehicle = vehicle;

      const vehicleCollection: IVehicle[] = [{ id: 54521 }];
      jest.spyOn(vehicleService, 'query').mockReturnValue(of(new HttpResponse({ body: vehicleCollection })));
      const additionalVehicles = [vehicle];
      const expectedCollection: IVehicle[] = [...additionalVehicles, ...vehicleCollection];
      jest.spyOn(vehicleService, 'addVehicleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rentalContract });
      comp.ngOnInit();

      expect(vehicleService.query).toHaveBeenCalled();
      expect(vehicleService.addVehicleToCollectionIfMissing).toHaveBeenCalledWith(vehicleCollection, ...additionalVehicles);
      expect(comp.vehiclesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UserExtended query and add missing value', () => {
      const rentalContract: IRentalContract = { id: 456 };
      const locataire: IUserExtended = { id: 64309 };
      rentalContract.locataire = locataire;
      const loueur: IUserExtended = { id: 70438 };
      rentalContract.loueur = loueur;

      const userExtendedCollection: IUserExtended[] = [{ id: 62104 }];
      jest.spyOn(userExtendedService, 'query').mockReturnValue(of(new HttpResponse({ body: userExtendedCollection })));
      const additionalUserExtendeds = [locataire, loueur];
      const expectedCollection: IUserExtended[] = [...additionalUserExtendeds, ...userExtendedCollection];
      jest.spyOn(userExtendedService, 'addUserExtendedToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rentalContract });
      comp.ngOnInit();

      expect(userExtendedService.query).toHaveBeenCalled();
      expect(userExtendedService.addUserExtendedToCollectionIfMissing).toHaveBeenCalledWith(
        userExtendedCollection,
        ...additionalUserExtendeds
      );
      expect(comp.userExtendedsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rentalContract: IRentalContract = { id: 456 };
      const vehicle: IVehicle = { id: 22711 };
      rentalContract.vehicle = vehicle;
      const locataire: IUserExtended = { id: 9724 };
      rentalContract.locataire = locataire;
      const loueur: IUserExtended = { id: 79013 };
      rentalContract.loueur = loueur;

      activatedRoute.data = of({ rentalContract });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rentalContract));
      expect(comp.vehiclesSharedCollection).toContain(vehicle);
      expect(comp.userExtendedsSharedCollection).toContain(locataire);
      expect(comp.userExtendedsSharedCollection).toContain(loueur);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RentalContract>>();
      const rentalContract = { id: 123 };
      jest.spyOn(rentalContractService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rentalContract });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rentalContract }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rentalContractService.update).toHaveBeenCalledWith(rentalContract);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RentalContract>>();
      const rentalContract = new RentalContract();
      jest.spyOn(rentalContractService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rentalContract });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rentalContract }));
      saveSubject.complete();

      // THEN
      expect(rentalContractService.create).toHaveBeenCalledWith(rentalContract);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RentalContract>>();
      const rentalContract = { id: 123 };
      jest.spyOn(rentalContractService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rentalContract });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rentalContractService.update).toHaveBeenCalledWith(rentalContract);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackVehicleById', () => {
      it('Should return tracked Vehicle primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackVehicleById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUserExtendedById', () => {
      it('Should return tracked UserExtended primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserExtendedById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
