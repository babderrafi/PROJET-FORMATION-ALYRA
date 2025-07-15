import { IUserExtended } from 'app/entities/user-extended/user-extended.model';

export interface IVehicle {
  id?: number;
  marque?: string;
  modele?: string;
  description?: string | null;
  tarifJournalier?: number;
  disponible?: boolean;
  loueur?: IUserExtended | null;
}

export class Vehicle implements IVehicle {
  constructor(
    public id?: number,
    public marque?: string,
    public modele?: string,
    public description?: string | null,
    public tarifJournalier?: number,
    public disponible?: boolean,
    public loueur?: IUserExtended | null
  ) {
    this.disponible = this.disponible ?? false;
  }
}

export function getVehicleIdentifier(vehicle: IVehicle): number | undefined {
  return vehicle.id;
}
