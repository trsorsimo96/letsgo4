import { IPartner } from 'app/shared/model//partner.model';
import { IConfigCommission } from 'app/shared/model//config-commission.model';

export interface IDistributor {
  id?: number;
  name?: string;
  email?: string;
  number?: string;
  logoContentType?: string;
  logo?: any;
  distributors?: IPartner[];
  distributors?: IConfigCommission[];
}

export const defaultValue: Readonly<IDistributor> = {};
