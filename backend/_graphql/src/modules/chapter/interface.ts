import { IInput } from "../_base/interface";

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

export interface IChaptersInput extends IInput {
  id?: string;
}

export interface IChapterInput {
  id?: string;
}
