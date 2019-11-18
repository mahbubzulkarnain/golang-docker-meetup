import { IInput } from "../_base/interface";

export interface ITag {
  id: string;
  name: string;
}

export interface ITagsInput extends IInput {
  id?: string;
}

export interface ITagInput {
  id?: string;
}
