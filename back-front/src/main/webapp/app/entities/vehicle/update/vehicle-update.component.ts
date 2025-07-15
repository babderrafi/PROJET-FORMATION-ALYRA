import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IVehicle, Vehicle } from '../vehicle.model';
import { VehicleService } from '../service/vehicle.service';
import { IUserExtended } from 'app/entities/user-extended/user-extended.model';
import { UserExtendedService } from 'app/entities/user-extended/service/user-extended.service';

@Component({
  selector: 'jhi-vehicle-update',
  templateUrl: './vehicle-update.component.html',
})
export class VehicleUpdateComponent implements OnInit {
  isSaving = false;

  userExtendedsSharedCollection: IUserExtended[] = [];

  editForm = this.fb.group({
    id: [],
    marque: [null, [Validators.required]],
    modele: [null, [Validators.required]],
    description: [],
    tarifJournalier: [null, [Validators.required]],
    disponible: [null, [Validators.required]],
    loueur: [],
  });

  constructor(
    protected vehicleService: VehicleService,
    protected userExtendedService: UserExtendedService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vehicle }) => {
      this.updateForm(vehicle);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vehicle = this.createFromForm();
    if (vehicle.id !== undefined) {
      this.subscribeToSaveResponse(this.vehicleService.update(vehicle));
    } else {
      this.subscribeToSaveResponse(this.vehicleService.create(vehicle));
    }
  }

  trackUserExtendedById(index: number, item: IUserExtended): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicle>>): void {
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

  protected updateForm(vehicle: IVehicle): void {
    this.editForm.patchValue({
      id: vehicle.id,
      marque: vehicle.marque,
      modele: vehicle.modele,
      description: vehicle.description,
      tarifJournalier: vehicle.tarifJournalier,
      disponible: vehicle.disponible,
      loueur: vehicle.loueur,
    });

    this.userExtendedsSharedCollection = this.userExtendedService.addUserExtendedToCollectionIfMissing(
      this.userExtendedsSharedCollection,
      vehicle.loueur
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userExtendedService
      .query()
      .pipe(map((res: HttpResponse<IUserExtended[]>) => res.body ?? []))
      .pipe(
        map((userExtendeds: IUserExtended[]) =>
          this.userExtendedService.addUserExtendedToCollectionIfMissing(userExtendeds, this.editForm.get('loueur')!.value)
        )
      )
      .subscribe((userExtendeds: IUserExtended[]) => (this.userExtendedsSharedCollection = userExtendeds));
  }

  protected createFromForm(): IVehicle {
    return {
      ...new Vehicle(),
      id: this.editForm.get(['id'])!.value,
      marque: this.editForm.get(['marque'])!.value,
      modele: this.editForm.get(['modele'])!.value,
      description: this.editForm.get(['description'])!.value,
      tarifJournalier: this.editForm.get(['tarifJournalier'])!.value,
      disponible: this.editForm.get(['disponible'])!.value,
      loueur: this.editForm.get(['loueur'])!.value,
    };
  }
}
