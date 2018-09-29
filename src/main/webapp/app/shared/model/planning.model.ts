import { Moment } from 'moment';
import { ICompany } from 'app/shared/model//company.model';
import { IRoute } from 'app/shared/model//route.model';
import { IConfigFare } from 'app/shared/model//config-fare.model';
import { ITravel } from 'app/shared/model//travel.model';
import { ICabin } from 'app/shared/model//cabin.model';

export interface IPlanning {
  id?: number;
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  sun?: boolean;
  departureHour?: Moment;
  arrivalHour?: Moment;
  company?: ICompany;
  route?: IRoute;
  configFare?: IConfigFare;
  travels?: ITravel[];
  cabin?: ICabin;
}

export const defaultValue: Readonly<IPlanning> = {
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
  sun: false
};
