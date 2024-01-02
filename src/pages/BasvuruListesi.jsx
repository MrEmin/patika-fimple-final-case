import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { tumBasvurulariGetir } from "../services/firebase";
import { useNavigate } from "react-router-dom"; 
import '../App.css'

const BasvuruListesi = () => {
  const [basvurular, setBasvurular] = useState([]);
  const { adminLogout } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    tumBasvurulariGetir((tumBasvurular) => {
      if (tumBasvurular) {
        console.log("Tüm Başvurular:", tumBasvurular);
        setBasvurular(tumBasvurular);
      } else {
        console.log("Başvurular bulunamadı.");
      }
    });
  }, []);

  const handleLogout = () => {
    adminLogout(); 
    navigate("/admin"); 
  };

  return (
    <div className="basvuru-listesi">
      <h2>Başvuru Listesi</h2>
      <button className="logout-button" onClick={handleLogout}>
        Çıkış Yap
      </button>

      <ul className="basvuru-items">
        {basvurular &&
          Object.keys(basvurular).map((basvuruId) => (
            <li className="basvuru-item" key={basvuruId}>
              <h3>Başvuru ID: {basvuruId}</h3>
              <p>Ad: {basvurular[basvuruId].ad}</p>
              <p>Soyad: {basvurular[basvuruId].soyad}</p>
              <p>Adres: {basvurular[basvuruId].adres}</p>
              <p>Neden: {basvurular[basvuruId].neden}</p>
              <p>TC: {basvurular[basvuruId].tc}</p>
              <p>Yaş: {basvurular[basvuruId].yas}</p>
              <button className="view-button" onClick={() => navigate(`/admin/basvuru/${basvuruId}`)}>
                Başvuruyu Görüntüle
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BasvuruListesi;
