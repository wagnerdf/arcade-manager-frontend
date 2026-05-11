import { api } from "./api";

export async function getGameStatus() {
  const response = await api.get("/enums/game-status");
  return response.data;
}

export async function getMediaTypes() {
  const response = await api.get("/enums/media-type");
  return response.data;
}
