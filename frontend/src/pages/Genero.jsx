import { useEffect, useState } from "react";
import { obtenerGeneros } from "../services/generoServices";

function Generos() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");

        try {

            const response = await fetch("https://act1-nicole-rondon.onrender.com/api/genero", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, descripcion }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.msg);
                return;
            }
            setMensaje("Género creado correctamente");

            setNombre("");
            setDescripcion("");
            cargarGeneros();

        } catch (error) {
            console.error("Error:", error);
            setError("Error al conectar con el servidor");
        }
    };

    const [generos, setGeneros] = useState([]);

    useEffect (()=>{
        cargarGeneros();
    },[]);

    const cargarGeneros = async () => {
        const data = await obtenerGeneros();
        setGeneros(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
            <div className="col-md-6">

                <div className="card shadow-lg p-4 border-0">
                <h2 className="text-center text-dark fw-bold mb-4">
                    Gestión de Géneros
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                    <label className="form-label">Nombre del género</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    </div>

                    <button type="submit" className="btn btn-success rounded-pill">
                    Guardar
                    </button>

                </form>
                <hr className="my-4" />

                {mensaje && (
                    <div className="alert alert-success text-center mt-3">{mensaje}</div>
                )}

                {error && (
                    <div className="alert alert-danger text-center mt-3">{error}</div>
                )}

                </div>

                <ul className="list-group mt-4">
                {generos.map((g) => (
                    <li key={g._id} className="list-group-item">
                    <strong>{g.nombre}</strong> - {g.descripcion}
                    </li>
                ))}
                </ul>

            </div>
            </div>
        </div>
    );
}

export default Generos;