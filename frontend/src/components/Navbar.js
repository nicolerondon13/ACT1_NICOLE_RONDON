import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          🎬 App Películas
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/media">
            Media
          </Link>

          <Link className="btn btn-outline-light me-2" to="/generos">
            Géneros
          </Link>

          <Link className="btn btn-outline-light me-2" to="/directores">
            Directores
          </Link>

          <Link className="btn btn-outline-light me-2" to="/productoras">
            Productoras
          </Link>

          <Link className="btn btn-outline-light" to="/tipos">
            Tipos
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;