import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICar, Car } from '../car.model';
import { CarService } from '../service/car.service';

@Component({
  selector: 'jhi-car-update',
  templateUrl: './car-update.component.html',
})
export class CarUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    nftId: [null, [Validators.required]],
    totalParts: [null, [Validators.required]],
    purchasePrice: [null, [Validators.required]],
    adminFees: [null, [Validators.required]],
    tokenizationCost: [null, [Validators.required]],
    maintenanceProvision: [null, [Validators.required]],
    managementMargin: [null, [Validators.required]],
  });

  constructor(protected carService: CarService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.updateForm(car);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.createFromForm();
    if (car.id !== undefined) {
      this.subscribeToSaveResponse(this.carService.update(car));
    } else {
      this.subscribeToSaveResponse(this.carService.create(car));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
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

  protected updateForm(car: ICar): void {
    this.editForm.patchValue({
      id: car.id,
      name: car.name,
      nftId: car.nftId,
      totalParts: car.totalParts,
      purchasePrice: car.purchasePrice,
      adminFees: car.adminFees,
      tokenizationCost: car.tokenizationCost,
      maintenanceProvision: car.maintenanceProvision,
      managementMargin: car.managementMargin,
    });
  }

  protected createFromForm(): ICar {
    return {
      ...new Car(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      nftId: this.editForm.get(['nftId'])!.value,
      totalParts: this.editForm.get(['totalParts'])!.value,
      purchasePrice: this.editForm.get(['purchasePrice'])!.value,
      adminFees: this.editForm.get(['adminFees'])!.value,
      tokenizationCost: this.editForm.get(['tokenizationCost'])!.value,
      maintenanceProvision: this.editForm.get(['maintenanceProvision'])!.value,
      managementMargin: this.editForm.get(['managementMargin'])!.value,
    };
  }
}
