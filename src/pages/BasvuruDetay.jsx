import React, { useState, useEffect } from "react";
import { getApplicationById, sendAnswer } from "../services/firebase";
import { useParams } from "react-router-dom";
import "../App.css";

const BasvuruDetay = () => {
  const [application, setApplication] = useState(null);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("Bekliyor");
  const { applicationId } = useParams();

  useEffect(() => {
    getApplicationById(applicationId)
      .then((data) => {
        setApplication(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [applicationId]);

  const handleSendAnswer = () => {
    const userId = applicationId;

    sendAnswer(applicationId, answer, userId, status)
      .then(() => {
        console.log("Cevap gönderildi!");
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className="basvuru-detay">
      <h2>Başvuru Detayı</h2>
      <p>Başvuru ID: {applicationId}</p>
      <p>Ad: {application && application.ad}</p>
      <p>Soyad: {application && application.soyad}</p>
      <p>TC: {application && application.tc}</p>
      <p>Yaş: {application && application.yas}</p>
      <p>Adres: {application && application.adres}</p>

      <select
        className="durum-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="bekliyor">Bekliyor</option>
        <option value="çözüldü">Çözüldü</option>
        <option value="iptal edildi">İptal Edildi</option>
      </select>

      <textarea
        className="cevap-textarea"
        rows="4"
        cols="50"
        placeholder="Cevap yaz..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <button className="cevap-gonder-button" onClick={handleSendAnswer}>
        Cevap Gönder
      </button>
    </div>
  );
};

export default BasvuruDetay;
