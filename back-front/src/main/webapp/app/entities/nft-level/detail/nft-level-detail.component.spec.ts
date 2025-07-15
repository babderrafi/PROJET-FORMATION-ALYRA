import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NFTLevelDetailComponent } from './nft-level-detail.component';

describe('NFTLevel Management Detail Component', () => {
  let comp: NFTLevelDetailComponent;
  let fixture: ComponentFixture<NFTLevelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NFTLevelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nFTLevel: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NFTLevelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NFTLevelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nFTLevel on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nFTLevel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
