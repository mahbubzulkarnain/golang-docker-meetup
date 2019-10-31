import { IInput } from "../_base/interface";

export interface IVenue {
  id: string;
  locationId: string;

  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IVenueInput extends IInput {
  id?: string;
}
