import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Panel from "./panel/Panel";
import Ucretler from "./pages/Ucretler";
import MenuDuzenle from "./panel/menu-islem";
import UcretDuzenle from "./panel/ucret-islem";
import Bulunamadi from "./components/Hata";
import Menuler from "./panel/menuler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/yonetici/panel" element={<Panel />} />
        <Route path="/ucretler" element={<Ucretler />} />
        <Route path="/menu/duzenle" element={<MenuDuzenle />} />
        <Route path="/ucret/duzenle" element={<UcretDuzenle />} />
        <Route path="/menu/menuler" element={<Menuler />} />
        <Route path="*" element={<Bulunamadi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
