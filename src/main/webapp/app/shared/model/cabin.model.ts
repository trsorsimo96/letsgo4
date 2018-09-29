import { IPlanning } from 'app/shared/model//planning.model';

export interface ICabin {
  id?: number;
  name?: string;
  title?: string;
  cabins?: IPlanning[];
}

export const defaultValue: Readonly<ICabin> = {};
