import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INFTLevel, NFTLevel } from '../nft-level.model';
import { NFTLevelService } from '../service/nft-level.service';

@Component({
  selector: 'jhi-nft-level-update',
  templateUrl: './nft-level-update.component.html',
})
export class NFTLevelUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    niveau: [null, [Validators.required]],
    seuilLocation: [null, [Validators.required]],
    tauxFrais: [null, [Validators.required]],
  });

  constructor(protected nFTLevelService: NFTLevelService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nFTLevel }) => {
      this.updateForm(nFTLevel);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nFTLevel = this.createFromForm();
    if (nFTLevel.id !== undefined) {
      this.subscribeToSaveResponse(this.nFTLevelService.update(nFTLevel));
    } else {
      this.subscribeToSaveResponse(this.nFTLevelService.create(nFTLevel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INFTLevel>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(nFTLevel: INFTLevel): void {
    this.editForm.patchValue({
      id: nFTLevel.id,
      niveau: nFTLevel.niveau,
      seuilLocation: nFTLevel.seuilLocation,
      tauxFrais: nFTLevel.tauxFrais,
    });
  }

  protected createFromForm(): INFTLevel {
    return {
      ...new NFTLevel(),
      id: this.editForm.get(['id'])!.value,
      niveau: this.editForm.get(['niveau'])!.value,
      seuilLocation: this.editForm.get(['seuilLocation'])!.value,
      tauxFrais: this.editForm.get(['tauxFrais'])!.value,
    };
  }
}
