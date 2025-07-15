import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDistribution, Distribution } from '../distribution.model';
import { DistributionService } from '../service/distribution.service';
import { IRevenue } from 'app/entities/revenue/revenue.model';
import { RevenueService } from 'app/entities/revenue/service/revenue.service';
import { IPart } from 'app/entities/part/part.model';
import { PartService } from 'app/entities/part/service/part.service';

@Component({
  selector: 'jhi-distribution-update',
  templateUrl: './distribution-update.component.html',
})
export class DistributionUpdateComponent implements OnInit {
  isSaving = false;

  revenuesSharedCollection: IRevenue[] = [];
  partsSharedCollection: IPart[] = [];

  editForm = this.fb.group({
    id: [],
    amountUsdc: [null, [Validators.required]],
    status: [null, [Validators.required]],
    revenue: [],
    part: [],
  });

  constructor(
    protected distributionService: DistributionService,
    protected revenueService: RevenueService,
    protected partService: PartService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ distribution }) => {
      this.updateForm(distribution);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const distribution = this.createFromForm();
    if (distribution.id !== undefined) {
      this.subscribeToSaveResponse(this.distributionService.update(distribution));
    } else {
      this.subscribeToSaveResponse(this.distributionService.create(distribution));
    }
  }

  trackRevenueById(index: number, item: IRevenue): number {
    return item.id!;
  }

  trackPartById(index: number, item: IPart): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDistribution>>): void {
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

  protected updateForm(distribution: IDistribution): void {
    this.editForm.patchValue({
      id: distribution.id,
      amountUsdc: distribution.amountUsdc,
      status: distribution.status,
      revenue: distribution.revenue,
      part: distribution.part,
    });

    this.revenuesSharedCollection = this.revenueService.addRevenueToCollectionIfMissing(
      this.revenuesSharedCollection,
      distribution.revenue
    );
    this.partsSharedCollection = this.partService.addPartToCollectionIfMissing(this.partsSharedCollection, distribution.part);
  }

  protected loadRelationshipsOptions(): void {
    this.revenueService
      .query()
      .pipe(map((res: HttpResponse<IRevenue[]>) => res.body ?? []))
      .pipe(
        map((revenues: IRevenue[]) => this.revenueService.addRevenueToCollectionIfMissing(revenues, this.editForm.get('revenue')!.value))
      )
      .subscribe((revenues: IRevenue[]) => (this.revenuesSharedCollection = revenues));

    this.partService
      .query()
      .pipe(map((res: HttpResponse<IPart[]>) => res.body ?? []))
      .pipe(map((parts: IPart[]) => this.partService.addPartToCollectionIfMissing(parts, this.editForm.get('part')!.value)))
      .subscribe((parts: IPart[]) => (this.partsSharedCollection = parts));
  }

  protected createFromForm(): IDistribution {
    return {
      ...new Distribution(),
      id: this.editForm.get(['id'])!.value,
      amountUsdc: this.editForm.get(['amountUsdc'])!.value,
      status: this.editForm.get(['status'])!.value,
      revenue: this.editForm.get(['revenue'])!.value,
      part: this.editForm.get(['part'])!.value,
    };
  }
}
