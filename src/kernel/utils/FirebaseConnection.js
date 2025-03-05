import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1G1YFJdwmXEJpQhJfnIxVDmq4p_KCbAQ",
  authDomain: "actividad02-21d8b.firebaseapp.com",
  projectId: "actividad02-21d8b",
  storageBucket: "actividad02-21d8b.firebasestorage.app",
  messagingSenderId: "502929681050",
  appId: "1:502929681050:web:c1ad05e1f6199695098d23"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };