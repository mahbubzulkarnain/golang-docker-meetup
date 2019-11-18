import { IInput } from "../_base/interface";

export interface ICategory {
  id: string;
  name: string;
  slug: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoriesInput extends IInput {
  id?: string;
}

export interface ICategoryInput {
  id?: string;
}
