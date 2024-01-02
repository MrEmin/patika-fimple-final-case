import React, { useState, useEffect } from "react";
import { getBasvuruById, sendAnswer } from "../services/firebase";
import { useParams } from "react-router-dom";
import "../App.css";

const BasvuruDetay = () => {
  const [basvuru, setBasvuru] = useState(null);
  const [cevap, setCevap] = useState("");
  const [durum, setDurum] = useState("Bekliyor");
  const { basvuruNo } = useParams();

  useEffect(() => {
    getBasvuruById(basvuruNo)
      .then((data) => {
        setBasvuru(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [basvuruNo]);

  const handleSendAnswer = () => {
    const userId = basvuruNo;

    sendAnswer(basvuruNo, cevap, userId, durum)
      .then(() => {
        console.log("Cevap gönderildi!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("Başvuru Verisi:", basvuru);

  return (
    <div className="basvuru-detay">
      <h2>Başvuru Detayı</h2>
      <p>Başvuru ID: {basvuruNo}</p>
      <p>Ad: {basvuru && basvuru.ad}</p>
      <p>Soyad: {basvuru && basvuru.soyad}</p>
      <p>TC: {basvuru && basvuru.tc}</p>
      <p>Yaş: {basvuru && basvuru.yas}</p>
      <p>Adres: {basvuru && basvuru.adres}</p>

      <select
        className="durum-select"
        value={durum}
        onChange={(e) => setDurum(e.target.value)}
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
        value={cevap}
        onChange={(e) => setCevap(e.target.value)}
      ></textarea>
      <button className="cevap-gonder-button" onClick={handleSendAnswer}>
        Cevap Gönder
      </button>
    </div>
  );
};

export default BasvuruDetay;
