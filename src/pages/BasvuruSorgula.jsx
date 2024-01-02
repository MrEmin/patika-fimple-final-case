import React, { useState } from "react";
import { basvuruDurumunuSorgula } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "../App.css";

const BasvuruSorgula = () => {
  const [basvuruKodu, setBasvuruKodu] = useState("");
  const navigate = useNavigate();

  const handleSorgula = () => {
    if (basvuruKodu) {
      basvuruDurumunuSorgula(basvuruKodu, (basvuruData) => {
        console.log(basvuruKodu);
        if (basvuruData) {
          navigate(`/basvuru/${basvuruKodu}`);
        } else {
          console.log("Başvuru bulunamadı veya kod hatalı.");
        }
      });
    } else {
      console.log("Geçerli bir başvuru kodu giriniz.");
    }
  };

  return (
    <div className="basvuru-sorgula-container">
      <h2>Başvuru Sorgulama</h2>
      <input
        className="basvuru-sorgula-input"
        type="text"
        placeholder="Başvuru Kodu"
        value={basvuruKodu}
        onChange={(e) => setBasvuruKodu(e.target.value)}
      />
      <button className="basvuru-sorgula-button" onClick={handleSorgula}>
        Sorgula
      </button>
    </div>
  );
};

export default BasvuruSorgula;
