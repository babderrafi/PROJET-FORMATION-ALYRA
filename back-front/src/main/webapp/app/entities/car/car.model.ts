export interface ICar {
  id?: number;
  name?: string;
  nftId?: string;
  totalParts?: number;
  purchasePrice?: number;
  adminFees?: number;
  tokenizationCost?: number;
  maintenanceProvision?: number;
  managementMargin?: number;
}

export class Car implements ICar {
  constructor(
    public id?: number,
    public name?: string,
    public nftId?: string,
    public totalParts?: number,
    public purchasePrice?: number,
    public adminFees?: number,
    public tokenizationCost?: number,
    public maintenanceProvision?: number,
    public managementMargin?: number
  ) {}
}

export function getCarIdentifier(car: ICar): number | undefined {
  return car.id;
}
