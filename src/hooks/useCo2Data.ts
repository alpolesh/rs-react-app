import { useState, useEffect } from 'react';

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

export function useCo2Data(url: string) {
  const [data, setData] = useState<Co2Data | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => res.json())
      .then((json: Co2Data) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (error) throw error;
  if (!data) throw new Promise(() => {});

  return data;
}
