export interface ICountry {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  subregion: string;
}

export interface IContinent {
  continent: string;
  countries: ICountry[];
}
