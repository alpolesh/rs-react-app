import { NextResponse } from 'next/server';
import type { GameDetails } from '@src/types/store/savedGamesSlice';

export async function POST(req: Request) {
  const { games } = await req.json();

  const csvRows: string[][] = [
    ['Name', 'Description', 'Game Id'],
    ...games.map((game: GameDetails) => [
      game.name ?? '',
      game.description ?? '',
      game.gameId ?? '',
    ]),
  ];

  const csvContent = csvRows
    .map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${games.length}_games.csv"`,
    },
  });
}
