import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FeePoolService } from '../service/fee-pool.service';
import { IFeePool, FeePool } from '../fee-pool.model';

import { FeePoolUpdateComponent } from './fee-pool-update.component';

describe('FeePool Management Update Component', () => {
  let comp: FeePoolUpdateComponent;
  let fixture: ComponentFixture<FeePoolUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let feePoolService: FeePoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FeePoolUpdateComponent],
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
      .overrideTemplate(FeePoolUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeePoolUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    feePoolService = TestBed.inject(FeePoolService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const feePool: IFeePool = { id: 456 };

      activatedRoute.data = of({ feePool });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(feePool));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FeePool>>();
      const feePool = { id: 123 };
      jest.spyOn(feePoolService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feePool });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feePool }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(feePoolService.update).toHaveBeenCalledWith(feePool);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FeePool>>();
      const feePool = new FeePool();
      jest.spyOn(feePoolService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feePool });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feePool }));
      saveSubject.complete();

      // THEN
      expect(feePoolService.create).toHaveBeenCalledWith(feePool);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<FeePool>>();
      const feePool = { id: 123 };
      jest.spyOn(feePoolService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feePool });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(feePoolService.update).toHaveBeenCalledWith(feePool);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
