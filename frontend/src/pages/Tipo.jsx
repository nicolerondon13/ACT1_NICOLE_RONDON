import { useEffect, useState } from "react";
import { obtenerTipos } from "../services/tipoServices";

function Tipos() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");

        try {

            const response = await fetch("http://localhost:4000/api/tipo", {
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
            setMensaje("Tipo creado correctamente");

            setNombre("");
            setDescripcion("");
            cargarTipos();

        } catch (error) {
            console.error("Error:", error);
            setError("Error al conectar con el servidor");
        }
    };

    const [tipos, setTipos] = useState([]);

    useEffect (()=>{
        cargarTipos();
    },[]);

    const cargarTipos = async () => {
        const data = await obtenerTipos();
        setTipos(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
            <div className="col-md-6">

                <div className="card shadow-lg p-4 border-0">
                <h2 className="text-center text-dark fw-bold mb-4">Gestión de Tipos</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                    <label className="form-label">Nombre del Tipo</label>
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
                )}</div>

                <ul className="list-group mt-4">
                {tipos.map((g) => (
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

export default Tipos;