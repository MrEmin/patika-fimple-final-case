import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getDatabase, ref, push, onValue, update } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Firebase Configuration
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

export function saveAndDisplay(data) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const newRef = push(ref(db, "applications"), data);
    const newKey = newRef.key;
    resolve(newKey);
  });
}

// Querying Application Status
export function queryApplicationStatus(applicationCode, callback) {
  const db = getDatabase();
  const applicationRef  = ref(db, `applications/${applicationCode}`);

  onValue(applicationRef , (snapshot) => {
    const applicationData  = snapshot.val();
    console.log("Snapshot değeri:", applicationData );

    // If data is not null or snapshot is not empty
    if (applicationData  !== null && snapshot.exists()) {
      console.log("Application found:", applicationData);
      callback(applicationData);
    } else {
      console.log("Application not found.");
      callback(null);
    }
  });
}

export function getAllApplications(callback) {
  const db = getDatabase();
  const applicationsRef  = ref(db, "applications");

  onValue(
    applicationsRef ,
    (snapshot) => {
      const allApplications = snapshot.val();
      if (allApplications) {
        console.log("All Applications:", allApplications);
        callback(allApplications);
      } else {
        console.log("Applications not found.");
        callback(null);
      }
    },
    (error) => {
      console.error("Error retrieving applications:", error);
      callback(null); 
    }
  );
}

export function getApplicationById(applicationId) {
  const db = getDatabase();
  const applicationRef  = ref(db, `applications/${applicationId}`);

  return new Promise((resolve, reject) => {
    onValue(
      applicationRef ,
      (snapshot) => {
        const applicationData  = snapshot.val();

        if (snapshot.exists() && applicationData  !== null) {
          resolve(applicationData );
        } else {
          reject(
            new Error(
              `Application not found or snapshot value is null. Application ID: ${applicationId}`
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
  const applicationRef = ref(db, `applications/${applicationId}`);

  return update(applicationRef, {
    isAnswered: true,
    answer: answer,
    answeredAt: firebase.database.ServerValue.TIMESTAMP,
    status: status, 
  }).then(() => {
    // Add the answer to user's data
    const userRef = ref(db, `users/${userId}`);
    return update(userRef, {
      answer: answer,
    });
  });
}

const authInstance = getAuth(app);
setPersistence(authInstance, browserLocalPersistence);

export {
  app,
  authInstance,
};
