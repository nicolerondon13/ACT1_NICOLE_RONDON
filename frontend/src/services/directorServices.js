import API_URL from "./api";

export const obtenerDirectores = async () => {
    const respuesta = await fetch(`${API_URL}/director`);
    const datos = await respuesta.json();
    return datos;
};