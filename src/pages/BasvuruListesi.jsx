import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllApplications } from "../services/firebase";
import { useNavigate } from "react-router-dom"; 
import '../App.css'

const BasvuruListesi = () => {
  const [applications, setApplications] = useState([]);
  const { adminLogout } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    getAllApplications((allApplications) => {
      if (allApplications) {
        console.log("Tüm Başvurular:", allApplications);
        setApplications(allApplications);
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
        {applications &&
          Object.keys(applications).map((applicationId) => (
            <li className="basvuru-item" key={applicationId}>
              <h3>Başvuru ID: {applicationId}</h3>
              <p>Ad: {applications[applicationId].ad}</p>
              <p>Soyad: {applications[applicationId].soyad}</p>
              <p>Adres: {applications[applicationId].adres}</p>
              <p>Neden: {applications[applicationId].neden}</p>
              <p>TC: {applications[applicationId].tc}</p>
              <p>Yaş: {applications[applicationId].yas}</p>
              <button className="view-button" onClick={() => navigate(`/admin/basvuru/${applicationId}`)}>
                Başvuruyu Görüntüle
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BasvuruListesi;
