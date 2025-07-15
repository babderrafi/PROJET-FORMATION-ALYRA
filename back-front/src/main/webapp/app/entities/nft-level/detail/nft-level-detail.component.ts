import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INFTLevel } from '../nft-level.model';

@Component({
  selector: 'jhi-nft-level-detail',
  templateUrl: './nft-level-detail.component.html',
})
export class NFTLevelDetailComponent implements OnInit {
  nFTLevel: INFTLevel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nFTLevel }) => {
      this.nFTLevel = nFTLevel;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
