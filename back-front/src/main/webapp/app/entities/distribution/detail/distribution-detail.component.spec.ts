import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistributionDetailComponent } from './distribution-detail.component';

describe('Distribution Management Detail Component', () => {
  let comp: DistributionDetailComponent;
  let fixture: ComponentFixture<DistributionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ distribution: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DistributionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DistributionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load distribution on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.distribution).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
