import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RentalContractDetailComponent } from './rental-contract-detail.component';

describe('RentalContract Management Detail Component', () => {
  let comp: RentalContractDetailComponent;
  let fixture: ComponentFixture<RentalContractDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalContractDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ rentalContract: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RentalContractDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RentalContractDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load rentalContract on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.rentalContract).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
