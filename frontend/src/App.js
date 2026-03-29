import Navbar from "./components/Navbar";
import Generos  from "./pages/Genero";
import Director from "./pages/Director";
import Productora from "./pages/Productora";
import Tipo from "./pages/Tipo";
import Media from "./pages/Media";

function App() {
  return (
    <div className="contaniner mt-4">
      <Navbar />

    
      <Generos />
      <Director />
      <Productora />
      <Tipo />
      <Media />
    </div>
  );
}

export default App;