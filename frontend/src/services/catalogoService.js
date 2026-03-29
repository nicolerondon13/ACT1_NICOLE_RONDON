import API_URL from "./api";

export const getGeneros = async () => {
  const res = await fetch(`${API_URL}/genero`);
  return await res.json();
};

export const getDirectores = async () => {
  const res = await fetch(`${API_URL}/director`);
  return await res.json();
};

export const getProductoras = async () => {
  const res = await fetch(`${API_URL}/productora`);
  return await res.json();
};

export const getTipos = async () => {
  const res = await fetch(`${API_URL}/tipo`);
  return await res.json();
};