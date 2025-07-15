import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPart, Part } from '../part.model';
import { PartService } from '../service/part.service';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';

@Component({
  selector: 'jhi-part-update',
  templateUrl: './part-update.component.html',
})
export class PartUpdateComponent implements OnInit {
  isSaving = false;

  carsSharedCollection: ICar[] = [];

  editForm = this.fb.group({
    id: [],
    ownerWallet: [null, [Validators.required]],
    percentage: [null, [Validators.required]],
    car: [],
  });

  constructor(
    protected partService: PartService,
    protected carService: CarService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ part }) => {
      this.updateForm(part);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const part = this.createFromForm();
    if (part.id !== undefined) {
      this.subscribeToSaveResponse(this.partService.update(part));
    } else {
      this.subscribeToSaveResponse(this.partService.create(part));
    }
  }

  trackCarById(index: number, item: ICar): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPart>>): void {
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

  protected updateForm(part: IPart): void {
    this.editForm.patchValue({
      id: part.id,
      ownerWallet: part.ownerWallet,
      percentage: part.percentage,
      car: part.car,
    });

    this.carsSharedCollection = this.carService.addCarToCollectionIfMissing(this.carsSharedCollection, part.car);
  }

  protected loadRelationshipsOptions(): void {
    this.carService
      .query()
      .pipe(map((res: HttpResponse<ICar[]>) => res.body ?? []))
      .pipe(map((cars: ICar[]) => this.carService.addCarToCollectionIfMissing(cars, this.editForm.get('car')!.value)))
      .subscribe((cars: ICar[]) => (this.carsSharedCollection = cars));
  }

  protected createFromForm(): IPart {
    return {
      ...new Part(),
      id: this.editForm.get(['id'])!.value,
      ownerWallet: this.editForm.get(['ownerWallet'])!.value,
      percentage: this.editForm.get(['percentage'])!.value,
      car: this.editForm.get(['car'])!.value,
    };
  }
}
