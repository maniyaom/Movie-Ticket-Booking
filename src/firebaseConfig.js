// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGmw-GG-SVnYKLaQ2yFfbJFK0fQxDa1hk",
  authDomain: "movie-ticket-8b083.firebaseapp.com",
  projectId: "movie-ticket-8b083",
  storageBucket:  "movie-ticket-8b083.appspot.com",
  messagingSenderId:  "307485397361",
  appId: "1:307485397361:web:d24e74a241b15c4d7026d0",
    measurementId: "G-XQSNEHCH7V",
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
