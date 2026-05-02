import { api } from "./api";

/**
 * Busca as estatísticas da biblioteca de jogos do usuário autenticado.
 *
 * @returns objeto contendo total, playing, completed, backlog e wishlist
 */
export async function getUserGameStats() {
  const response = await api.get("/user-games/stats");
  return response.data;
}
