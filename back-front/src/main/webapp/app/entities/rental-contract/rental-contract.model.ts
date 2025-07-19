import dayjs from 'dayjs/esm';
import { IVehicle } from 'app/entities/vehicle/vehicle.model';
import { IUserExtended } from 'app/entities/user-extended/user-extended.model';
import { StatutContrat } from 'app/entities/enumerations/statut-contrat.model';

export interface IRentalContract {
  id?: number;
  dateDebut?: dayjs.Dayjs;
  dateFin?: dayjs.Dayjs;
  statut?: StatutContrat;
  fraisAppliques?: number;
  montantTotal?: number;
  idBc?: number;
  vehicle?: IVehicle | null;
  locataire?: IUserExtended | null;
  loueur?: IUserExtended | null;
}

export class RentalContract implements IRentalContract {
  constructor(
    public id?: number,
    public dateDebut?: dayjs.Dayjs,
    public dateFin?: dayjs.Dayjs,
    public statut?: StatutContrat,
    public fraisAppliques?: number,
    public montantTotal?: number,
    public idBc?: number,
    public vehicle?: IVehicle | null,
    public locataire?: IUserExtended | null,
    public loueur?: IUserExtended | null
  ) {}
}

export function getRentalContractIdentifier(rentalContract: IRentalContract): number | undefined {
  return rentalContract.id;
}
