import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ButtonContainer from "./pages/ButtonContainer";
import BasvuruOlustur from "./pages/BasvuruOlustur";
import BasvuruBasarili from "./pages/BasvuruBasarili";
import BasvuruSorgula from "./pages/BasvuruSorgula";
import Admin from "./pages/Admin";
import BasvuruListesi from "./pages/BasvuruListesi";
import BasvuruDetay from "./pages/BasvuruDetay";
import { useAuth } from "./context/AuthContext";
import SorguDetay from "./pages/SorguDetay";

function App() {
  const { isAdminLoggedIn } = useAuth();

  useEffect(() => {
    console.log("isAdminLoggedIn güncellendi:", isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ButtonContainer />} />
          <Route path="/basvuru-olustur" element={<BasvuruOlustur />} />
          <Route path="/basvuru-basarili" element={<BasvuruBasarili />} />
          <Route path="/basvuru-sorgula" element={<BasvuruSorgula />} />
          <Route path="/admin" element={<Admin />} />
          {isAdminLoggedIn ? (
            <Route path="/admin/basvuru-listesi" element={<BasvuruListesi />} />
          ) : (
            <Route
              path="/admin/basvuru-listesi"
              element={<Navigate to="/admin" />}
            />
          )}
          <Route path="/admin/basvuru/:basvuruNo" element={<BasvuruDetay />} />
          <Route path="/basvuru/:basvuruNo" element={<SorguDetay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
