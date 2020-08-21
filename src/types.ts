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
  countDay: number;
  date: string;
};

export type CheckinsData = {
  beer: Beer;
  count: number;
  first_had: Date;
  id: number;
  rating: number;
};

// JSON Types

export type Transform = {
  scale: number[];
  translate: number[];
};

export type Properties = {
  scalerank: number;
  featurecla: string;
  labelrank: number;
  sovereignt: string;
  sov_a3: string;
  adm0_dif: number;
  level: number;
  type: string;
  admin: string;
  adm0_a3: string;
  geou_dif: number;
  geounit: string;
  gu_a3: string;
  su_dif: number;
  subunit: string;
  su_a3: string;
  brk_diff: number;
  name: string;
  name_long: string;
  brk_a3: string;
  brk_name: string;
  brk_group: string;
  abbrev: string;
  postal: string;
  formal_en: string;
  formal_fr: string;
  note_adm0: string;
  note_brk: string;
  name_sort: string;
  name_alt: string;
  mapcolor7: number;
  mapcolor8: number;
  mapcolor9: number;
  mapcolor13: number;
  pop_est: number;
  gdp_md_est: number;
  pop_year: number;
  lastcensus: number;
  gdp_year: number;
  economy: string;
  income_grp: string;
  wikipedia: number;
  fips_10: string;
  iso_a2: string;
  iso_a3: string;
  iso_n3: string;
  un_a3: string;
  wb_a2: string;
  wb_a3: string;
  woe_id: number;
  adm0_a3_is: string;
  adm0_a3_us: string;
  adm0_a3_un: number;
  adm0_a3_wb: number;
  continent: string;
  region_un: string;
  subregion: string;
  region_wb: string;
  name_len: number;
  long_len: number;
  abbrev_len: number;
  tiny: number;
  homepart: number;
};

export type Geometry = {
  arcs: any[][];
  type: string;
  properties: Properties;
};

export type Units = {
  type: string;
  geometries: Geometry[];
};

export type Objects = {
  units: Units;
};

export type RootObject = {
  type: string;
  arcs: number[][][];
  transform: Transform;
  objects: Objects;
};
