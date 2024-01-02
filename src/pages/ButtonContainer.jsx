import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function ButtonContainer() {
  return (
    <div className="button-container">
      <Link to="/basvuru-olustur">
        <button className="main-button">Başvuru Oluştur</button>
      </Link>
      <Link to="/basvuru-sorgula">
        <button className="main-button">Başvuru Sorgula</button>
      </Link>
      <Link to="/admin">
        <button className="main-button">Admin</button>
      </Link>
    </div>
  );
}

export default ButtonContainer;
