export interface GameDetails {
  name?: string;
  description?: string;
  gameId: string;
}

export type SavedGamesState = Record<string, GameDetails>;
