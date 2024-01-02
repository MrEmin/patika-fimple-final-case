import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getDatabase, ref, push, onValue, update } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Firebase yapılandırma
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "fir-82f30.firebaseapp.com",
  databaseURL: "https://fir-82f30-default-rtdb.firebaseio.com",
  projectId: "fir-82f30",
  storageBucket: "fir-82f30.appspot.com",
  messagingSenderId: "46128464116",
  appId: "1:46128464116:web:e56797c7149aa999281ea1",
};
const app = initializeApp(firebaseConfig);

export function kaydetVeGoster(data) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const yeniRef = push(ref(db, "basvurular"), data);
    const yeniKod = yeniRef.key;
    resolve(yeniKod);
  });
}

// Başvuru durumunu sorgulama işlemi
export function basvuruDurumunuSorgula(basvuruKodu, callback) {
  const db = getDatabase();
  const basvuruRef = ref(db, `basvurular/${basvuruKodu}`);

  onValue(basvuruRef, (snapshot) => {
    const basvuruData = snapshot.val();
    console.log("Snapshot değeri:", basvuruData);

    // Veri null değilse ya da snapshot boş değilse
    if (basvuruData !== null && snapshot.exists()) {
      console.log("Başvuru bulundu:", basvuruData);
      callback(basvuruData);
    } else {
      console.log("Başvuru bulunamadı.");
      callback(null);
    }
  });
}

export function tumBasvurulariGetir(callback) {
  const db = getDatabase();
  const basvurularRef = ref(db, "basvurular");

  onValue(
    basvurularRef,
    (snapshot) => {
      const tumBasvurular = snapshot.val();
      if (tumBasvurular) {
        console.log("Tüm Başvurular:", tumBasvurular);
        callback(tumBasvurular);
      } else {
        console.log("Başvurular bulunamadı.");
        callback(null);
      }
    },
    (error) => {
      console.error("Başvuruları alma sırasında bir hata oluştu:", error);
      callback(null); 
    }
  );
}

export function getBasvuruById(basvuruNo) {
  const db = getDatabase();
  const basvuruRef = ref(db, `basvurular/${basvuruNo}`);

  return new Promise((resolve, reject) => {
    onValue(
      basvuruRef,
      (snapshot) => {
        const basvuruData = snapshot.val();

        if (snapshot.exists() && basvuruData !== null) {
          resolve(basvuruData);
        } else {
          reject(
            new Error(
              `Başvuru bulunamadı veya snapshot değeri null. Basvuru No: ${basvuruNo}`
            )
          );
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function sendAnswer(applicationId, answer, userId, status) {
  const db = getDatabase();
  const applicationRef = ref(db, `basvurular/${applicationId}`);

  return update(applicationRef, {
    isAnswered: true,
    answer: answer,
    answeredAt: firebase.database.ServerValue.TIMESTAMP,
    status: status, 
  }).then(() => {
    // Kullanıcının verilerine cevabı ekle
    const userRef = ref(db, `users/${userId}`);
    return update(userRef, {
      cevap: answer,
    });
  });
}

const authInstance = getAuth(app);
setPersistence(authInstance, browserLocalPersistence);

export {
  app,
  authInstance,
};
