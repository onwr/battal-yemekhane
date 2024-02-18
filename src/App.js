import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import DLayout from "./layout/DuyuruLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DLayout />}>
          <Route path="/" element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
