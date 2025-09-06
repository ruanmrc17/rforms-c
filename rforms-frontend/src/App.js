import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import RelatorioPlantao from "./components/RelatorioPlantao.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* Links para navegar */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/relatorioPlantao">RelatorioPlantao</Link> 
      </nav>

      {/* Definição das rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/relatorioPlantao" element={<RelatorioPlantao />} />
      </Routes>
    </BrowserRouter>
  );
}
