import { api } from "./api";

export async function searchGames(name: string) {
  const response = await api.get("/external/games", {
    params: { name },
  });

  return response.data;
}
