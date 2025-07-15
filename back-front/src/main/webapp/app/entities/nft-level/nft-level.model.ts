export interface INFTLevel {
  id?: number;
  niveau?: string;
  seuilLocation?: number;
  tauxFrais?: number;
}

export class NFTLevel implements INFTLevel {
  constructor(public id?: number, public niveau?: string, public seuilLocation?: number, public tauxFrais?: number) {}
}

export function getNFTLevelIdentifier(nFTLevel: INFTLevel): number | undefined {
  return nFTLevel.id;
}
