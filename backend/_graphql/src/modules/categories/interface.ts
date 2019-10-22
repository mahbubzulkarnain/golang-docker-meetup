import { IInput } from "../_base/directives/interface";

export interface ICategory {
  id: string;
  name: string;
  slug: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryInput extends IInput {
  id?: string;
}
