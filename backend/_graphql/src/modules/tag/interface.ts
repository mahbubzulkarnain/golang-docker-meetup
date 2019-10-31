import { IInput } from "../_base/interface";

export interface ITag {
  id: string;
  name: string;
}

export interface ITagInput extends IInput {
  id?: string;
}
