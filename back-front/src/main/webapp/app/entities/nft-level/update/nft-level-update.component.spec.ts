import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NFTLevelService } from '../service/nft-level.service';
import { INFTLevel, NFTLevel } from '../nft-level.model';

import { NFTLevelUpdateComponent } from './nft-level-update.component';

describe('NFTLevel Management Update Component', () => {
  let comp: NFTLevelUpdateComponent;
  let fixture: ComponentFixture<NFTLevelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nFTLevelService: NFTLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NFTLevelUpdateComponent],
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
      .overrideTemplate(NFTLevelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NFTLevelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nFTLevelService = TestBed.inject(NFTLevelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nFTLevel: INFTLevel = { id: 456 };

      activatedRoute.data = of({ nFTLevel });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(nFTLevel));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NFTLevel>>();
      const nFTLevel = { id: 123 };
      jest.spyOn(nFTLevelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nFTLevel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nFTLevel }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(nFTLevelService.update).toHaveBeenCalledWith(nFTLevel);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NFTLevel>>();
      const nFTLevel = new NFTLevel();
      jest.spyOn(nFTLevelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nFTLevel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nFTLevel }));
      saveSubject.complete();

      // THEN
      expect(nFTLevelService.create).toHaveBeenCalledWith(nFTLevel);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NFTLevel>>();
      const nFTLevel = { id: 123 };
      jest.spyOn(nFTLevelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nFTLevel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nFTLevelService.update).toHaveBeenCalledWith(nFTLevel);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
