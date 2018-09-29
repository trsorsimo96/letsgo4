import { IRoute } from 'app/shared/model//route.model';

export interface ITown {
  id?: number;
  name?: string;
  title?: string;
  departure?: IRoute;
  arrival?: IRoute;
}

export const defaultValue: Readonly<ITown> = {};
