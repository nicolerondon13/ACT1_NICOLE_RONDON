import { useEffect, useState } from "react";
import { obtenerDirectores } from "../services/directorServices";

function Director() {

    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");

        try {

            const response = await fetch("https://act1-nicole-rondon.onrender.com/api/director", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nombre}),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.msg);
                return;
            }
            setMensaje("Director creado correctamente");

            setNombre("");
            cargarDirectores();

        } catch (error) {
            console.error("Error:", error);
            setError("Error al conectar con el servidor");
        }
    };

    const [director, setDirectores] = useState([]);

    useEffect (()=>{
        cargarDirectores();
    },[]);

    const cargarDirectores = async () => {
        const data = await obtenerDirectores();
        setDirectores(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
            <div className="col-md-6">

                <div className="card shadow-lg p-4 border-0">
                <h2 className="text-center text-dark fw-bold mb-4">Gestión de Directores</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                    <label className="form-label">Nombre del director</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
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
                {director.map((d) => (
                    <li key={d._id} className="list-group-item">
                    <strong>{d.nombre}</strong>
                    </li>
                ))}
                </ul>

            </div>
            </div>
        </div>
     );
}

export default Director;