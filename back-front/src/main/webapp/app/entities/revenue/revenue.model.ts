import dayjs from 'dayjs/esm';
import { ICar } from 'app/entities/car/car.model';

export interface IRevenue {
  id?: number;
  month?: dayjs.Dayjs;
  amountEur?: number;
  amountUsdc?: number;
  car?: ICar | null;
}

export class Revenue implements IRevenue {
  constructor(
    public id?: number,
    public month?: dayjs.Dayjs,
    public amountEur?: number,
    public amountUsdc?: number,
    public car?: ICar | null
  ) {}
}

export function getRevenueIdentifier(revenue: IRevenue): number | undefined {
  return revenue.id;
}
