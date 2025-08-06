import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Game } from '@src/types/game';

const API_BASE = 'https://zelda.fanapis.com/api';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  tagTypes: ['Games', 'GameDetails'],
  endpoints: (builder) => ({
    getGamesByName: builder.query<Game[], string>({
      query: (name) => `/games?name=${name}`,
      providesTags: ['Games'],
    }),

    getGameById: builder.query<Game, string>({
      query: (gameId) => `/games/${gameId}`,
      providesTags: (_result, _error, gameId) => [
        { type: 'GameDetails', id: gameId },
      ],
    }),
  }),
});

export const { useGetGamesByNameQuery, useGetGameByIdQuery } = gamesApi;
