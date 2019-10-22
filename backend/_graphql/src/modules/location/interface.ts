import { IInput } from "../_base/directives/interface";

export interface ILocation {
  id: string;

  city: string;
  postalCode: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface ILocationInput extends IInput {
  id?: string;
}
