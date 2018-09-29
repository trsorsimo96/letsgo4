import { IPartner } from 'app/shared/model//partner.model';
import { ICompany } from 'app/shared/model//company.model';
import { ITravel } from 'app/shared/model//travel.model';

export interface IResa {
  id?: number;
  passengerName?: string;
  passengerCniNumber?: string;
  email?: string;
  number?: string;
  partner?: IPartner;
  company?: ICompany;
  travel?: ITravel;
}

export const defaultValue: Readonly<IResa> = {};
