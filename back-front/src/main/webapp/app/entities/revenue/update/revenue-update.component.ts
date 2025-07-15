import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IRevenue, Revenue } from '../revenue.model';
import { RevenueService } from '../service/revenue.service';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';

@Component({
  selector: 'jhi-revenue-update',
  templateUrl: './revenue-update.component.html',
})
export class RevenueUpdateComponent implements OnInit {
  isSaving = false;

  carsSharedCollection: ICar[] = [];

  editForm = this.fb.group({
    id: [],
    month: [null, [Validators.required]],
    amountEur: [null, [Validators.required]],
    amountUsdc: [null, [Validators.required]],
    car: [],
  });

  constructor(
    protected revenueService: RevenueService,
    protected carService: CarService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ revenue }) => {
      if (revenue.id === undefined) {
        const today = dayjs().startOf('day');
        revenue.month = today;
      }

      this.updateForm(revenue);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const revenue = this.createFromForm();
    if (revenue.id !== undefined) {
      this.subscribeToSaveResponse(this.revenueService.update(revenue));
    } else {
      this.subscribeToSaveResponse(this.revenueService.create(revenue));
    }
  }

  trackCarById(index: number, item: ICar): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRevenue>>): void {
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

  protected updateForm(revenue: IRevenue): void {
    this.editForm.patchValue({
      id: revenue.id,
      month: revenue.month ? revenue.month.format(DATE_TIME_FORMAT) : null,
      amountEur: revenue.amountEur,
      amountUsdc: revenue.amountUsdc,
      car: revenue.car,
    });

    this.carsSharedCollection = this.carService.addCarToCollectionIfMissing(this.carsSharedCollection, revenue.car);
  }

  protected loadRelationshipsOptions(): void {
    this.carService
      .query()
      .pipe(map((res: HttpResponse<ICar[]>) => res.body ?? []))
      .pipe(map((cars: ICar[]) => this.carService.addCarToCollectionIfMissing(cars, this.editForm.get('car')!.value)))
      .subscribe((cars: ICar[]) => (this.carsSharedCollection = cars));
  }

  protected createFromForm(): IRevenue {
    return {
      ...new Revenue(),
      id: this.editForm.get(['id'])!.value,
      month: this.editForm.get(['month'])!.value ? dayjs(this.editForm.get(['month'])!.value, DATE_TIME_FORMAT) : undefined,
      amountEur: this.editForm.get(['amountEur'])!.value,
      amountUsdc: this.editForm.get(['amountUsdc'])!.value,
      car: this.editForm.get(['car'])!.value,
    };
  }
}
