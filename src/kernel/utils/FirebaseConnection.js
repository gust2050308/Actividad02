import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyA2Z2pPkubvT3-kzcYerBAixoCKIzitwKE",
    authDomain: "airbnb-97c45.firebaseapp.com",
    projectId: "airbnb-97c45",
    storageBucket: "airbnb-97c45.firebasestorage.app",
    messagingSenderId: "419174761289",
    appId: "1:419174761289:web:b283a341c3453238dc1098"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };