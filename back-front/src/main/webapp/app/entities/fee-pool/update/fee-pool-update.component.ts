import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFeePool, FeePool } from '../fee-pool.model';
import { FeePoolService } from '../service/fee-pool.service';

@Component({
  selector: 'jhi-fee-pool-update',
  templateUrl: './fee-pool-update.component.html',
})
export class FeePoolUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    montantCollecte: [null, [Validators.required]],
    montantRedistribue: [],
  });

  constructor(protected feePoolService: FeePoolService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feePool }) => {
      this.updateForm(feePool);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feePool = this.createFromForm();
    if (feePool.id !== undefined) {
      this.subscribeToSaveResponse(this.feePoolService.update(feePool));
    } else {
      this.subscribeToSaveResponse(this.feePoolService.create(feePool));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeePool>>): void {
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

  protected updateForm(feePool: IFeePool): void {
    this.editForm.patchValue({
      id: feePool.id,
      montantCollecte: feePool.montantCollecte,
      montantRedistribue: feePool.montantRedistribue,
    });
  }

  protected createFromForm(): IFeePool {
    return {
      ...new FeePool(),
      id: this.editForm.get(['id'])!.value,
      montantCollecte: this.editForm.get(['montantCollecte'])!.value,
      montantRedistribue: this.editForm.get(['montantRedistribue'])!.value,
    };
  }
}
