import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { RentalSmartService } from 'app/rental-contract/rental-smart.service';
import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IRentalContract, RentalContract } from '../rental-contract.model';
import { RentalContractService } from '../service/rental-contract.service';
import { IVehicle } from 'app/entities/vehicle/vehicle.model';
import { VehicleService } from 'app/entities/vehicle/service/vehicle.service';
import { IUserExtended } from 'app/entities/user-extended/user-extended.model';
import { UserExtendedService } from 'app/entities/user-extended/service/user-extended.service';
import { StatutContrat } from 'app/entities/enumerations/statut-contrat.model';

@Component({
  selector: 'jhi-rental-contract-update',
  templateUrl: './rental-contract-update.component.html',
})
export class RentalContractUpdateComponent implements OnInit {
  isSaving = false;
  statutContratValues = Object.keys(StatutContrat);

  vehiclesSharedCollection: IVehicle[] = [];
  userExtendedsSharedCollection: IUserExtended[] = [];

  editForm = this.fb.group({
    id: [],
    dateDebut: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    statut: [null, [Validators.required]],
    fraisAppliques: [null, [Validators.required]],
    vehicle: [null, Validators.required],
    locataire: [null, Validators.required],
    loueur: [null, Validators.required],
  });

  constructor(
    protected router: Router,
    protected rentalSmartService: RentalSmartService,
    protected rentalContractService: RentalContractService,
    protected vehicleService: VehicleService,
    protected userExtendedService: UserExtendedService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rentalContract }) => {
      if (rentalContract.id === undefined) {
        const today = dayjs().startOf('day');
        rentalContract.dateDebut = today;
        rentalContract.dateFin = today;
      }

      this.updateForm(rentalContract);
      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rentalContract = this.createFromForm();

    rentalContract.vehicle = rentalContract.vehicle ? { id: rentalContract.vehicle.id } : null;
    rentalContract.locataire = rentalContract.locataire ? { id: rentalContract.locataire.id } : null;
    rentalContract.loueur = rentalContract.loueur ? { id: rentalContract.loueur.id } : null;

    this.rentalSmartService.getCurrentAccount().then(account => {
      const locataireAddress = this.editForm.get('locataire')!.value?.ethereumAddress;
      const loueurAddress = this.editForm.get('loueur')!.value?.ethereumAddress;
      const vehicleId = this.editForm.get('vehicle')!.value?.id;
      const montant = this.editForm.get('fraisAppliques')!.value;
      const dateDebut = Math.floor(dayjs(this.editForm.get('dateDebut')!.value, DATE_TIME_FORMAT).toDate().getTime() / 1000);
      const dateFin = Math.floor(dayjs(this.editForm.get('dateFin')!.value, DATE_TIME_FORMAT).toDate().getTime() / 1000);

      if (!locataireAddress || !loueurAddress || !vehicleId || !montant) {
        throw new Error('Champs requis manquants pour la création blockchain');
      }

      return this.rentalSmartService.createContract(
        locataireAddress,
        loueurAddress,
        vehicleId,
        dateDebut,
        dateFin,
        montant,
        account
      );
    })
      .then((idBlockchain: number) => {
        rentalContract.idBc = idBlockchain;
        this.subscribeToSaveResponse(this.rentalContractService.create(rentalContract));
      })
      .catch(error => {
        this.isSaving = false;
        alert('Erreur lors de la création du contrat sur la blockchain ou l\'API.');
      });
  }



  trackVehicleById(index: number, item: IVehicle): number {
    return item.id!;
  }

  trackUserExtendedById(index: number, item: IUserExtended): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRentalContract>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: err => {
        this.isSaving = false;
        alert('Erreur lors de l\'enregistrement dans la base de données.');
      },
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(rentalContract: IRentalContract): void {
    this.editForm.patchValue({
      id: rentalContract.id,
      dateDebut: rentalContract.dateDebut ? rentalContract.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFin: rentalContract.dateFin ? rentalContract.dateFin.format(DATE_TIME_FORMAT) : null,
      statut: rentalContract.statut,
      fraisAppliques: rentalContract.fraisAppliques,
      vehicle: rentalContract.vehicle,
      locataire: rentalContract.locataire,
      loueur: rentalContract.loueur,
    });

    this.vehiclesSharedCollection = this.vehicleService.addVehicleToCollectionIfMissing(
      this.vehiclesSharedCollection,
      rentalContract.vehicle
    );
    this.userExtendedsSharedCollection = this.userExtendedService.addUserExtendedToCollectionIfMissing(
      this.userExtendedsSharedCollection,
      rentalContract.locataire,
      rentalContract.loueur
    );
  }

  protected loadRelationshipsOptions(): void {
    this.vehicleService
      .query()
      .pipe(map((res: HttpResponse<IVehicle[]>) => res.body ?? []))
      .pipe(
        map((vehicles: IVehicle[]) => this.vehicleService.addVehicleToCollectionIfMissing(vehicles, this.editForm.get('vehicle')!.value))
      )
      .subscribe((vehicles: IVehicle[]) => (this.vehiclesSharedCollection = vehicles));

    this.userExtendedService
      .query()
      .pipe(map((res: HttpResponse<IUserExtended[]>) => res.body ?? []))
      .pipe(
        map((userExtendeds: IUserExtended[]) =>
          this.userExtendedService.addUserExtendedToCollectionIfMissing(
            userExtendeds,
            this.editForm.get('locataire')!.value,
            this.editForm.get('loueur')!.value
          )
        )
      )
      .subscribe((userExtendeds: IUserExtended[]) => (this.userExtendedsSharedCollection = userExtendeds));
  }

  protected createFromForm(): IRentalContract {
    return {
      ...new RentalContract(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value ? dayjs(this.editForm.get(['dateDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      dateFin: this.editForm.get(['dateFin'])!.value ? dayjs(this.editForm.get(['dateFin'])!.value, DATE_TIME_FORMAT) : undefined,
      statut: this.editForm.get(['statut'])!.value,
      fraisAppliques: this.editForm.get(['fraisAppliques'])!.value,
      vehicle: this.editForm.get(['vehicle'])!.value,
      locataire: this.editForm.get(['locataire'])!.value,
      loueur: this.editForm.get(['loueur'])!.value,
    };
  }
}
