import React, { useState } from "react";
import { queryApplicationStatus } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "../App.css";

const BasvuruSorgula = () => {
  const [applicationCode, setApplicationCode] = useState("");
  const navigate = useNavigate();

  const handleQuery = () => {
    if (applicationCode) {
      queryApplicationStatus(applicationCode, (applicationData ) => {
        console.log(applicationCode);
        if (applicationData ) {
          navigate(`/basvuru/${applicationCode}`);
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
        value={applicationCode}
        onChange={(e) => setApplicationCode(e.target.value)}
      />
      <button className="basvuru-sorgula-button" onClick={handleQuery}>
        Sorgula
      </button>
    </div>
  );
};

export default BasvuruSorgula;
