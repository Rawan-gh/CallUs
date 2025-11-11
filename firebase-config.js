// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPzRqV-_hGNedZoeGNtorLTGWTBMmqdkc",
  authDomain: "prj-adc-gcp-coop-test.firebaseapp.com",
  projectId: "prj-adc-gcp-coop-test",
  storageBucket: "prj-adc-gcp-coop-test.firebasestorage.app",
  messagingSenderId: "472242813268",
  appId: "1:472242813268:web:4e7b4650015fd473d4f0c1",
  measurementId: "G-RGEPGD1T9T"
};

// Initialize Firebase (will be called after Firebase SDK is loaded)
let app, analytics;

function initializeFirebase() {
  if (typeof firebase !== 'undefined') {
    app = firebase.initializeApp(firebaseConfig);
    analytics = firebase.analytics();
    console.log('Firebase initialized successfully');
    return { app, analytics };
  } else {
    console.error('Firebase SDK not loaded');
    return null;
  }
}
