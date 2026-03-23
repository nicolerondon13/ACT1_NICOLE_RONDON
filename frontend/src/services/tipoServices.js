import API_URL from "./api";

export const obtenerTipos = async () => {
  const respuesta = await fetch(`${API_URL}/tipo`);
  const datos = await respuesta.json();
  return datos;
};