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

export type Location = {
  lat: number;
  lon: number;
  state: string;
};

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

export type APIResponse<T> = {
  data: { [name: string]: Array<T> };
  status: string;
};

export type User = {
  avatar: string;
  avatarHd: string;
  firstName: string;
  id: number;
  lastName: string;
  lastUpdate: Date | null;
  totalBadges: number;
  totalBeers: number;
  totalCheckins: number;
  totalFriends: number;
  userName: string;
};

export type MonthsData = {
  averageRating: number;
  count: number;
  month: number;
};

export type TimeOfDayData = {
  averageRating: number;
  count: number;
  hour: number;
};

export type YearsData = {
  averageRating: number;
  count: number;
  year: number;
};

export type DayOfWeekData = {
  averageRating: number;
  count: number;
  weekday: number;
};

export type GraphData = {
  count: number;
  date: string;
};
