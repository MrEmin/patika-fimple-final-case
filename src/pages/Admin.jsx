import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authInstance } from "../services/firebase";
import "../App.css";

const Admin = () => {
  const auth = useAuth();
  const { adminLogin } = auth || {};
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(authInstance, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Giriş başarılı! Kullanıcı:", user);
        adminLogin(username, password); // AuthContext'teki isAdminLoggedIn değerini günceller
        navigate("/admin/basvuru-listesi");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Giriş hatası:", errorMessage);
        setLoginError(errorMessage);
      });
  };

  return (
    <div className="admin-container">
      <h2>Admin Girişi</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </div>
  );
};

export default Admin;
