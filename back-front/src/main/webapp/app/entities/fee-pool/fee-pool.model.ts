export interface IFeePool {
  id?: number;
  montantCollecte?: number;
  montantRedistribue?: number | null;
}

export class FeePool implements IFeePool {
  constructor(public id?: number, public montantCollecte?: number, public montantRedistribue?: number | null) {}
}

export function getFeePoolIdentifier(feePool: IFeePool): number | undefined {
  return feePool.id;
}
