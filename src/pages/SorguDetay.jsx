import React, { useState, useEffect } from "react";
import { getApplicationById } from "../services/firebase";
import { useParams } from "react-router-dom";
import "../App.css";

const SorguDetay = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    // applicationId'ye göre başvuru verilerini al
    getApplicationById(applicationId)
      .then((data) => {
        setApplication(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [applicationId]);

  if (!application) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container">
      <h2>Başvuru Detayı</h2>
      <div className="detail-item">
        <span className="detail-label">Ad:</span>
        <span className="detail-value">{application.ad}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Soyad:</span>
        <span className="detail-value">{application.soyad}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Yaş:</span>
        <span className="detail-value">{application.yas}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">TC:</span>
        <span className="detail-value">{application.tc}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Adres:</span>
        <span className="detail-value">{application.adres}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Neden:</span>
        <span className="detail-value">{application.neden}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Durum:</span>
        <span className="detail-value">
          {application.status ? application.status : "Bekliyor"}
        </span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Cevap:</span>
        <span className="detail-value">
          {application.answer ? application.answer : "Çözülmedi"}
        </span>
      </div>
    </div>
  );
};

export default SorguDetay;
