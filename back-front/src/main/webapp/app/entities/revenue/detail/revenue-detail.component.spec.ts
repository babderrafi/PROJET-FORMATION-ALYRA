import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RevenueDetailComponent } from './revenue-detail.component';

describe('Revenue Management Detail Component', () => {
  let comp: RevenueDetailComponent;
  let fixture: ComponentFixture<RevenueDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenueDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ revenue: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RevenueDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RevenueDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load revenue on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.revenue).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
