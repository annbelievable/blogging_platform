const { initializeApp } = require("firebase/app");
const {
    initializeAppCheck,
    ReCaptchaV3Provider,
} = require("firebase/app-check");
const { getFirestore } = require("firebase/firestore");
const { getAnalytics, isSupported } = require("firebase/analytics");
const { getAuth } = require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyZdtgqht6NgcWFiLmGsv5RnCOrXH-2PY",
    authDomain: "blogging-platform-c87fd.firebaseapp.com",
    projectId: "blogging-platform-c87fd",
    storageBucket: "blogging-platform-c87fd.appspot.com",
    messagingSenderId: "1061757806361",
    appId: "1:1061757806361:web:13cea5efe21dd4f4318788",
    measurementId: "G-6W4RTHJ2S5",
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);

//const appCheck = initializeAppCheck(fbApp, {
//    provider: new ReCaptchaV3Provider(
//        "6LcUbRUnAAAAAB6JcII524vDIMJZSle4GPNYBDs8"
//    ),

//    // Optional argument. If true, the SDK automatically refreshes App Check
//    // tokens as needed.
//    isTokenAutoRefreshEnabled: true,
//});

const db = getFirestore(fbApp);
const auth = getAuth(fbApp);
let analytics = null;

if (isSupported()) {
    //analytics = getAnalytics(fbApp);
}

console.log(fbApp);

module.exports = auth;
