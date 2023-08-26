import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import Anasayfa from "./pages/Anasayfa";
import Gecmis from "./pages/KatildigimGunler";
import GirisYap from "./pages/SignIn";
import KayitOl from "./pages/SignUp";
import SifremiUnuttum from "./pages/ForgotPassword";
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
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<GirisYap />} />
          <Route path="/kayit-ol" element={<KayitOl />} />
          <Route path="/sifremi-unuttum" element={<SifremiUnuttum />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/anasayfa" element={<Anasayfa />} />
          <Route path="/gecmis" element={<Gecmis />} />
          <Route path="/gunun-menusu" element={<Menu />} />
          <Route path="/yonetici/panel" element={<Panel />} />
          <Route path="/ucretler" element={<Ucretler />} />
          <Route path="/menu/duzenle" element={<MenuDuzenle />} />
          <Route path="/ucret/duzenle" element={<UcretDuzenle />} />
          <Route path="/menu/menuler" element={<Menuler />} />
        </Route>
        <Route path="*" element={<Bulunamadi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
