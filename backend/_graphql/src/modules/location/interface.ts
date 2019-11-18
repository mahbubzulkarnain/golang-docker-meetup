import { IInput } from "../_base/interface";

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

export interface ILocationsInput extends IInput {
  id?: string;
}

export interface ILocationInput {
  id?: string;
}
