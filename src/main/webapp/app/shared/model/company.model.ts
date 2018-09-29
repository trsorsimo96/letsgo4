import { IResa } from 'app/shared/model//resa.model';
import { IConfigCommission } from 'app/shared/model//config-commission.model';
import { IPlanning } from 'app/shared/model//planning.model';

export interface ICompany {
  id?: number;
  name?: string;
  title?: string;
  email?: string;
  number?: string;
  logoContentType?: string;
  logo?: any;
  resellers?: IResa[];
  companies?: IConfigCommission[];
  companies?: IPlanning[];
}

export const defaultValue: Readonly<ICompany> = {};
