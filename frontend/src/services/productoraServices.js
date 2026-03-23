import API_URL from "./api";

export const obtenerProductoras = async () => {
    const respuesta = await fetch(`${API_URL}/productora`);
    const datos = await respuesta.json ();
    return datos;
};

export const eliminarProductora = async (id) => {
    const respuesta = await fetch(`${API_URL}/productora/${id}`, {
        method: "DELETE"
    });

    return await respuesta.json();
};

export const actualizarProductora = async (id, data) => {
    const res = await fetch(`${API_URL}/productora/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};
