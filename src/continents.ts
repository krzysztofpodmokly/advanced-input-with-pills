import { IContinent } from "./components/input/interface";

export const continentsWithCountries: IContinent[] = [
  {
    continent: "All",
    countries: [],
  },
  {
    continent: "Europe",
    countries: [
      {
        code: "PL",
        name: "Poland",
        nativeName: "Polska",
        region: "Europe",
        subregion: "Central Europe",
      },
      {
        code: "DE",
        name: "Germany",
        nativeName: "Deutschland",
        region: "Europe",
        subregion: "Western Europe",
      },
      {
        code: "FR",
        name: "France",
        nativeName: "France",
        region: "Europe",
        subregion: "Western Europe",
      },
    ],
  },
  {
    continent: "Africa",
    countries: [
      {
        code: "NG",
        name: "Nigeria",
        nativeName: "Nigeria",
        region: "Africa",
        subregion: "Western Africa",
      },
      {
        code: "EG",
        name: "Egypt",
        nativeName: "مصر",
        region: "Africa",
        subregion: "Northern Africa",
      },
      {
        code: "ZA",
        name: "South Africa",
        nativeName: "South Africa",
        region: "Africa",
        subregion: "Southern Africa",
      },
    ],
  },
  // Add more continents and countries as needed
];
