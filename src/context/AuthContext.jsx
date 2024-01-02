import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const authInstance = getAuth();

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);

  const adminLogin = async (username, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        username,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken(); // Firebase'ten token'i al
      localStorage.setItem("userToken", token); // Token'i localStorage'a kaydet

      setIsAdminLoggedIn(true);
      console.log("Giriş başarılı! Kullanıcı:", user);
    } catch (error) {
      console.error("Giriş hatası:", error.message);
      throw error;
    }
  };
  const adminLogout = async () => {
    try {
      await signOut(authInstance);
      console.log("Çıkış başarılı!");
      setIsAdminLoggedIn(true);
    } catch (error) {
      console.error("Çıkış hatası:", error.message);
      throw error;
    }
  };

  // AuthProvider içinde useEffect kısmında isAdminLoggedIn durumunu localStorage'daki token varlığına göre kontrol etme
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
