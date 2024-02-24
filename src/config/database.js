import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Importe getStorage


const firebaseConfig = {
  apiKey: "AIzaSyDCfaGzSgdY7bWwYLT1ROa_-9mIYwCUCm0",
  authDomain: "belavista-f8043.firebaseapp.com",
  projectId: "belavista-f8043",
  storageBucket: "belavista-f8043.appspot.com",
  messagingSenderId: "115801430698",
  appId: "1:115801430698:web:506222c624e21ac3cf8ed3",
  measurementId: "G-7Y9MQLVQVS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app); // Obtenha o Firebase Storage

export { database, storage };
