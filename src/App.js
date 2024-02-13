import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Ucretler from "./pages/Ucretler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/ucretler" element={<Ucretler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
