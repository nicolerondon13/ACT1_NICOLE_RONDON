import { useEffect, useState } from "react";
import { obtenerMedia } from "../services/mediaServices";
import {
  getGeneros,
  getDirectores,
  getProductoras,
  getTipos
} from "../services/catalogoService";

function Media() {

  const [medias, setMedias] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [url, setUrl] = useState("");
  const [imagen, setImagen] = useState("");
  const [anioEstreno, setAnioEstreno] = useState("");

  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [productora, setProductora] = useState("");
  const [tipo, setTipo] = useState("");

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const dataMedia = await obtenerMedia();
    setMedias(dataMedia);

    const dataGeneros = await getGeneros();
    setGeneros(dataGeneros.filter(g => g.estado === "Activo"));

    const dataDirectores = await getDirectores();
    setDirectores(dataDirectores.filter(d => d.estado === "Activo"));

    const dataProductoras = await getProductoras();
    setProductoras(dataProductoras);

    const dataTipos = await getTipos();
    setTipos(dataTipos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://act1-nicole-rondon.onrender.com/api/media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          serial: Date.now().toString(),
          titulo,
          sinopsis,
          url,
          imagen,
          anioEstreno,
          genero,
          director,
          productora,
          tipo
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg);
        return;
      }

      setMensaje("Media creada correctamente");

      cargarDatos();

    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Gestión de Media</h2>

      <form onSubmit={handleSubmit}>

        <input placeholder="Título" onChange={e => setTitulo(e.target.value)} className="form-control mb-2"/>
        <input placeholder="Sinopsis" onChange={e => setSinopsis(e.target.value)} className="form-control mb-2"/>
        <input placeholder="URL" onChange={e => setUrl(e.target.value)} className="form-control mb-2"/>
        <input placeholder="Imagen" onChange={e => setImagen(e.target.value)} className="form-control mb-2"/>
        <input placeholder="Año" onChange={e => setAnioEstreno(e.target.value)} className="form-control mb-2"/>

        <select onChange={e => setGenero(e.target.value)} className="form-control mb-2">
          <option value="">Seleccione Género</option>
          {generos.map(g => (
            <option key={g._id} value={g._id}>{g.nombre}</option>
          ))}
        </select>

        <select onChange={e => setDirector(e.target.value)} className="form-control mb-2">
          <option value="">Seleccione Director</option>
          {directores.map(d => (
            <option key={d._id} value={d._id}>{d.nombre}</option>
          ))}
        </select>

        <select onChange={e => setProductora(e.target.value)} className="form-control mb-2">
          <option value="">Seleccione Productora</option>
          {productoras.map(p => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        <select onChange={e => setTipo(e.target.value)} className="form-control mb-2">
          <option value="">Seleccione Tipo</option>
          {tipos.map(t => (
            <option key={t._id} value={t._id}>{t.nombre}</option>
          ))}
        </select>

        <button className="btn btn-primary">Guardar</button>
      </form>

      {mensaje && <p className="text-success">{mensaje}</p>}
      {error && <p className="text-danger">{error}</p>}

      <hr />

      <h3>Lista de Medias</h3>

      <ul className="list-group">
        {medias.map(m => (
          <li key={m._id} className="list-group-item">
            {m.titulo} - {m.genero?.nombre} - {m.director?.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Media;