import { IItem } from "./IItem";

export interface IDictionary {
  id: string;
  name: string;
  items: IItem[];
  isActive: boolean;

}
