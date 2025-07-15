jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RentalContractService } from '../service/rental-contract.service';

import { RentalContractDeleteDialogComponent } from './rental-contract-delete-dialog.component';

describe('RentalContract Management Delete Component', () => {
  let comp: RentalContractDeleteDialogComponent;
  let fixture: ComponentFixture<RentalContractDeleteDialogComponent>;
  let service: RentalContractService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RentalContractDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(RentalContractDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RentalContractDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RentalContractService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
