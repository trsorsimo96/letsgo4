import { IPlanning } from 'app/shared/model//planning.model';

export interface IRoute {
  id?: number;
  title?: string;
  paths?: IPlanning[];
}

export const defaultValue: Readonly<IRoute> = {};
