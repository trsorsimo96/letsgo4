import { IResa } from 'app/shared/model//resa.model';
import { IDistributor } from 'app/shared/model//distributor.model';

export interface IPartner {
  id?: number;
  name?: string;
  solde?: number;
  resellers?: IResa[];
  distributor?: IDistributor;
}

export const defaultValue: Readonly<IPartner> = {};
