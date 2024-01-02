import React, { useState, useEffect } from "react";
import { getBasvuruById } from "../services/firebase";
import { useParams } from "react-router-dom";
import "../App.css";

const SorguDetay = () => {
  const { basvuruNo } = useParams();
  const [basvuru, setBasvuru] = useState(null);

  useEffect(() => {
    // basvuruNo'ya göre başvuru verilerini al
    getBasvuruById(basvuruNo)
      .then((data) => {
        setBasvuru(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [basvuruNo]);

  if (!basvuru) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container">
      <h2>Başvuru Detayı</h2>
      <div className="detail-item">
        <span className="detail-label">Ad:</span>
        <span className="detail-value">{basvuru.ad}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Soyad:</span>
        <span className="detail-value">{basvuru.soyad}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Yaş:</span>
        <span className="detail-value">{basvuru.yas}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">TC:</span>
        <span className="detail-value">{basvuru.tc}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Adres:</span>
        <span className="detail-value">{basvuru.adres}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Neden:</span>
        <span className="detail-value">{basvuru.neden}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Durum:</span>
        <span className="detail-value">
          {basvuru.status ? basvuru.status : "Bekliyor"}
        </span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Cevap:</span>
        <span className="detail-value">
          {basvuru.answer ? basvuru.answer : "Çözülmedi"}
        </span>
      </div>
    </div>
  );
};

export default SorguDetay;
