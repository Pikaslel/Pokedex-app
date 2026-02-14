import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import PokemonDetailPage from "./pages/PokemonDetail";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      </Routes>
    </>
  );
}


export default App;
