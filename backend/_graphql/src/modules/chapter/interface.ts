import { IInput } from "../_base/directives/interface";

export interface IChapter {
  id: string;
  categoryId: string;
  locationId: string;
  creatorId: string;

  name: string;
  description: string;
  details: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IChapterInput extends IInput {
  id?: string;
}
