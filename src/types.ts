export type Beer = {
  abv: number;
  brewery: Brewery;
  count: number;
  firstHad: string;
  id: number;
  label: string;
  name: string;
  rating: number;
  style: string;
  userRating: number;
};

interface Location {
  lat: number;
  lon: number;
  state: string;
}

export type Brewery = {
  averageRating: number;
  beers: Beer[];
  count: number;
  id: number;
  label: string;
  location: Location;
  name: string;
};

export type CountryData = {
  averageRating: number;
  breweries: Brewery[];
  code: string;
  count: number;
  name: string;
};
