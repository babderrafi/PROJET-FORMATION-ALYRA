import { ICar } from 'app/entities/car/car.model';

export interface IPart {
  id?: number;
  ownerWallet?: string;
  percentage?: number;
  car?: ICar | null;
}

export class Part implements IPart {
  constructor(public id?: number, public ownerWallet?: string, public percentage?: number, public car?: ICar | null) {}
}

export function getPartIdentifier(part: IPart): number | undefined {
  return part.id;
}
