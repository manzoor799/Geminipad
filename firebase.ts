import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Check if all required config values are present and not undefined
const isFirebaseConfigured = Object.values(firebaseConfig).every(value => value);

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    // Ensure auth remains null if initialization fails
    auth = null;
  }
} else {
  console.warn("Firebase configuration is missing. Authentication features will be disabled. Please provide Firebase credentials in your environment variables to enable login.");
}

// Export the auth object, which will be null if configuration is missing or initialization fails
export { auth };