import { useEffect, useState } from "react";
import { obtenerProductoras} from "../services/productoraServices";

function Productora() {

    const [nombre, setNombre] = useState("");
    const [slogan, setSlogan] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");
        

        try {

            const response = await fetch("http://localhost:4000/api/productora", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nombre, slogan, descripcion}),
            });

            const data = await response.json();
            console.log("RESPUESTA BACKEND:", data);
            if (!response.ok) {
                setError(data.msg);
                return;
            }
            setMensaje("Productora creada correctamente");

            setNombre("");
            setSlogan("");
            setDescripcion("");
            cargarProductoras();

        } catch (error) {
            console.error("Error:", error);
            setError("Error al conectar con el servidor");
        }
    };

    const [productora, setProductoras] = useState([]);

    useEffect (()=>{
        cargarProductoras();
    },[]);

    const cargarProductoras = async () => {
        const data = await obtenerProductoras();
        setProductoras(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
            <div className="col-md-6">

                <div className="card shadow-lg p-4 border-0">
                <h2 className="text-center text-dark fw-bold mb-4">Gestión de Productoras</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label">Nombre de la Productora</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Slogan</label>
                    <input
                        type="text"
                        className="form-control"
                        value={slogan}
                        onChange={(e) => setSlogan(e.target.value)}
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
                {productora.map((p) => (
                    <li key={p._id} className="list-group-item">
                    <strong>{p.nombre}</strong> - {p.slogan} - {p.descripcion}
                    </li>
                ))}
                </ul>

            </div>
            </div>
        </div>
    );
}

export default Productora;