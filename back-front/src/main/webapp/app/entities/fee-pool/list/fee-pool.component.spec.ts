import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FeePoolService } from '../service/fee-pool.service';

import { FeePoolComponent } from './fee-pool.component';

describe('FeePool Management Component', () => {
  let comp: FeePoolComponent;
  let fixture: ComponentFixture<FeePoolComponent>;
  let service: FeePoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FeePoolComponent],
    })
      .overrideTemplate(FeePoolComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeePoolComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FeePoolService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.feePools?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
