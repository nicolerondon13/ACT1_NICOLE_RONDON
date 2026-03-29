import API_URL from "./api";

export const obtenerMedia = async () => {
    const respuesta = await fetch(`${API_URL}/media`);
    const datos = await respuesta.json ();
    return datos;
};

export const eliminarMedia = async (id) => {
    const respuesta = await fetch(`${API_URL}/media/${id}`, {
        method: "DELETE"
    });

    return await respuesta.json();
};

export const actualizarMedia = async (id, data) => {
    const res = await fetch(`${API_URL}/media/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};