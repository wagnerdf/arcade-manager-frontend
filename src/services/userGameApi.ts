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

/**
 * Busca a biblioteca de jogos do usuário autenticado (paginada).
 *
 * @param page número da página (default: 0)
 * @param size quantidade de itens por página (default: 10)
 * @param sort ordenação (default: gameTitle,asc)
 *
 * @returns objeto Page com lista de jogos em content
 */
export async function getUserLibrary(
  page = 0,
  size = 10,
  sort = "gameTitle,asc",
) {
  const response = await api.get("/user-games/me/library", {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
}
