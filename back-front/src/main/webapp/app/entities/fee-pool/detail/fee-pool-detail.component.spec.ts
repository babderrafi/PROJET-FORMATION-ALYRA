import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FeePoolDetailComponent } from './fee-pool-detail.component';

describe('FeePool Management Detail Component', () => {
  let comp: FeePoolDetailComponent;
  let fixture: ComponentFixture<FeePoolDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeePoolDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ feePool: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FeePoolDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FeePoolDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load feePool on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.feePool).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
