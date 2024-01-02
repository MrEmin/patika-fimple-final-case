import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

const BasvuruBasarili = () => {
  const location = useLocation();
  const [applicationCode, setApplicationCode] = useState("");

  useEffect(() => {
    if (location.state && location.state.applicationCode) {
      setApplicationCode(location.state.applicationCode);
    }
  }, [location.state]);

  return (
    <div className="container">
      <h2 className="success-message">
        Teşekkürler! Başvurunuz başarıyla alındı.
      </h2>
      <p className="basvuru-info">Başvuru Kodunuz: {applicationCode}</p>
    </div>
  );
};

export default BasvuruBasarili;
