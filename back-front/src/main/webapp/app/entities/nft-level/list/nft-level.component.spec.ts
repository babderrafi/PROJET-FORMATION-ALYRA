import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NFTLevelService } from '../service/nft-level.service';

import { NFTLevelComponent } from './nft-level.component';

describe('NFTLevel Management Component', () => {
  let comp: NFTLevelComponent;
  let fixture: ComponentFixture<NFTLevelComponent>;
  let service: NFTLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NFTLevelComponent],
    })
      .overrideTemplate(NFTLevelComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NFTLevelComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NFTLevelService);

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
    expect(comp.nFTLevels?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
