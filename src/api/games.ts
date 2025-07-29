const API_BASE = 'https://zelda.fanapis.com/api';

export async function fetchGamesByName(name: string) {
  const response = await fetch(`${API_BASE}/games?name=${name}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
}

export async function fetchGameById(gameId: string) {
  const response = await fetch(`${API_BASE}/games/${gameId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data;
}
