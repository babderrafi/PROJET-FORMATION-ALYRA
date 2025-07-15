import { IRevenue } from 'app/entities/revenue/revenue.model';
import { IPart } from 'app/entities/part/part.model';

export interface IDistribution {
  id?: number;
  amountUsdc?: number;
  status?: string;
  revenue?: IRevenue | null;
  part?: IPart | null;
}

export class Distribution implements IDistribution {
  constructor(
    public id?: number,
    public amountUsdc?: number,
    public status?: string,
    public revenue?: IRevenue | null,
    public part?: IPart | null
  ) {}
}

export function getDistributionIdentifier(distribution: IDistribution): number | undefined {
  return distribution.id;
}
