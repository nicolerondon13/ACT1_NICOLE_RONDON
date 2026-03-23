import API_URL from "./api";

export const obtenerGeneros = async () => {
  const respuesta = await fetch(`${API_URL}/genero`);
  const datos = await respuesta.json();
  return datos;
};