export interface Game {
  name: string;
  description: string;
  developer: string;
  publisher: string;
  released_date: string;
  id: string;
}

export type SelectedGameId = string | null;
