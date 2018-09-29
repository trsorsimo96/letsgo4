import { IDistributor } from 'app/shared/model//distributor.model';
import { ICompany } from 'app/shared/model//company.model';

export interface IConfigCommission {
  id?: number;
  numero?: number;
  commision?: number;
  commisionPartner?: number;
  distributor?: IDistributor;
  company?: ICompany;
}

export const defaultValue: Readonly<IConfigCommission> = {};
