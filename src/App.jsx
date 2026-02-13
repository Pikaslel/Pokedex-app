import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
