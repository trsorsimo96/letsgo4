import { IPlanning } from 'app/shared/model//planning.model';

export interface IConfigFare {
  id?: number;
  numero?: number;
  fare?: number;
  cancelable?: boolean;
  penaltyCancel?: number;
  noshow?: boolean;
  penaltyNoShow?: number;
  companies?: IPlanning[];
}

export const defaultValue: Readonly<IConfigFare> = {
  cancelable: false,
  noshow: false
};
