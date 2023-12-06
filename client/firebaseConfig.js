// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDk9Q6h50NQ-CIYjKYvSTpcXdKepfBsvQA',
  authDomain: 'kajian-kuy-storage.firebaseapp.com',
  projectId: 'kajian-kuy-storage',
  storageBucket: 'kajian-kuy-storage.appspot.com',
  messagingSenderId: '1073762520723',
  appId: '1:1073762520723:web:2a8d9cdde4d63900880766',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
