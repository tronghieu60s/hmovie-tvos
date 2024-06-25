import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAR5117f9l4FYdSoTnfaRCuL_fJXTIh6Rk",
  authDomain: "hmovie-279aa.firebaseapp.com",
  projectId: "hmovie-279aa",
  storageBucket: "hmovie-279aa.appspot.com",
  messagingSenderId: "423904225487",
  appId: "1:423904225487:web:d8ed0794779528acfdafba",
};

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export default app;
export { fireStore };
