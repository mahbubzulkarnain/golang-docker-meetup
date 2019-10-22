import { IInput } from "../_base/directives/interface";

export interface IEvent {
  id: string;
  chapterId?: string;
  tagId?: string;
  venueId?: string;

  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  capacity: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface IEventInput extends IInput {
  id?: string;
}
