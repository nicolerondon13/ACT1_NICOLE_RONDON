import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Generos from "./pages/Genero";
import Director from "./pages/Director";
import Productora from "./pages/Productora";
import Tipo from "./pages/Tipo";
import Media from "./pages/Media";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Media />} />
          <Route path="/media" element={<Media />} />
          <Route path="/generos" element={<Generos />} />
          <Route path="/directores" element={<Director />} />
          <Route path="/productoras" element={<Productora />} />
          <Route path="/tipos" element={<Tipo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;