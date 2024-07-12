import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "ptit-nmh-project.firebaseapp.com",
  projectId: "ptit-nmh-project",
  storageBucket: "ptit-nmh-project.appspot.com",
  messagingSenderId: "371535166857",
  appId: "1:371535166857:web:878b6a397596b2737fb558"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase storage service
export const storage = getStorage(app);

export { ref, uploadBytes, getDownloadURL };
