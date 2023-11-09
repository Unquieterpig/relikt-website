import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { initilizeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, query, where, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyArDMwfNnCXj7xSAwtd_ovIIT1Likd6bcs",
    authDomain: "relikt-b74a6.firebaseapp.com",
    projectId: "relikt-b74a6",
    storageBucket: "relikt-b74a6.appspot.com",
    messagingSenderId: "985666558766",
    appId: "1:985666558766:web:2bdad1eeb19f64222338bf",
    measurementId: "G-60FDK4PYN0"
};

// todo; add try catch
// Initialize Firebase
const app = initilizeApp(firebaseConfig);

// Auth exports
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(app);

// Storage exports
export const storage = getStorage(app);

/// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users");
  const userQuery = query(
    usersRef,
    where("username", "==", username),
    limit(1)
  );
  const userDoc = await getDocs(userQuery);
  return userDoc.docs[0];
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  }