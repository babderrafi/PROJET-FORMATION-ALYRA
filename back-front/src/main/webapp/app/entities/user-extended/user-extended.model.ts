import { IVehicle } from 'app/entities/vehicle/vehicle.model';
import { IRentalContract } from 'app/entities/rental-contract/rental-contract.model';
import { UserRole } from 'app/entities/enumerations/user-role.model';
import {INFTLevel} from "../nft-level/nft-level.model";

export interface IUserExtended {
  id?: number;
  role?: UserRole;
  ethereumAddress?: string;
  vehicles?: IVehicle[] | null;
  rentalContractsAsLocataires?: IRentalContract[] | null;
  rentalContractsAsLoueurs?: IRentalContract[] | null;
  nftLevel?: INFTLevel | null;
}

export class UserExtended implements IUserExtended {
  constructor(
    public id?: number,
    public role?: UserRole,
    public ethereumAddress?: string,
    public vehicles?: IVehicle[] | null,
    public rentalContractsAsLocataires?: IRentalContract[] | null,
    public rentalContractsAsLoueurs?: IRentalContract[] | null,
    public nftLevel?: INFTLevel | null
  ) {}
}

export function getUserExtendedIdentifier(userExtended: IUserExtended): number | undefined {
  return userExtended.id;
}
