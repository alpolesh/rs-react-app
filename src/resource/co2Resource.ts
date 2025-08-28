export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | undefined;
}

export interface CountryData {
  iso_code?: string;
  data: YearlyData[];
}
export type Co2Data = Record<string, CountryData>;

let co2DataPromise: Promise<Co2Data> | null = null;
let co2Data: Co2Data | null = null;

export function loadCo2Data() {
  if (co2Data) return co2Data;

  if (!co2DataPromise) {
    co2DataPromise = fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    )
      .then((res) => res.json())
      .then((json) => {
        co2Data = json as Co2Data;
        return co2Data;
      });
  }

  throw co2DataPromise;
}
