import { Country } from '../../pais/models/country';

export interface Track {
  id: number;
  name: string;
  size: number;
  country: Country;
}
