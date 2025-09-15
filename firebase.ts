// // src/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";

// // 🔑 Replace with your Firebase project config
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// // Setup invisible reCAPTCHA
// export const setupRecaptcha = (containerId: string) => {
//   return new RecaptchaVerifier(
//     containerId,
//     {
//       size: "invisible",
//       callback: (response: any) => {
//         console.log("Recaptcha verified!", response);
//       },
//     },
//     auth
//   );
// };


// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, Auth } from "firebase/auth";

// // Firebase config
// const firebaseConfig = {
//  apiKey: "AIzaSyASLpn6SKZ3Rh3ZZrKRbVuSatVbD0GO664",
//   authDomain: "swipe-match-b32c8.firebaseapp.com",
//   projectId: "swipe-match-b32c8",
//   storageBucket: "swipe-match-b32c8.firebasestorage.app",
//   messagingSenderId: "7328455976",
//   appId: "1:7328455976:web:d803bf41ba963bae27441d",
//   measurementId: "G-BMDVH0QGN2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth: Auth = getAuth(app); // ✅ explicitly type as Auth

// // Setup Recaptcha
// export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
//   return new RecaptchaVerifier(containerId, { size: "invisible" }, auth);
// };


// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, Auth } from "firebase/auth";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyASLpn6SKZ3Rh3ZZrKRbVuSatVbD0GO664",
//   authDomain: "swipe-match-b32c8.firebaseapp.com",
//   projectId: "swipe-match-b32c8",
//   storageBucket: "swipe-match-b32c8.firebasestorage.app",
//   messagingSenderId: "7328455976",
//   appId: "1:7328455976:web:d803bf41ba963bae27441d",
//   measurementId: "G-BMDVH0QGN2",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth: Auth = getAuth(app);

// // 🔹 Ensure global RecaptchaVerifier so it isn’t recreated
// declare global {
//   interface Window {
//     recaptchaVerifier: RecaptchaVerifier;
//   }
// }

// // Setup Recaptcha (invisible)
// export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       containerId,
//       {
//         size: "invisible",
//         callback: (response: any) => {
//           console.log("✅ reCAPTCHA solved:", response);
//         },
//       },
//       auth
//     );
//     window.recaptchaVerifier.render(); // 🔹 important!
//   }
//   return window.recaptchaVerifier;
// };
 

// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASLpn6SKZ3Rh3ZZrKRbVuSatVbD0GO664",
  authDomain: "swipe-match-b32c8.firebaseapp.com",
  projectId: "swipe-match-b32c8",
  storageBucket: "swipe-match-b32c8.firebasestorage.app",
  messagingSenderId: "7328455976",
  appId: "1:7328455976:web:d803bf41ba963bae27441d",
  measurementId: "G-BMDVH0QGN2",
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

// ✅ Proper Recaptcha setup
export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible", // can be "normal" if you want visible widget
    callback: (response: any) => {
      console.log("reCAPTCHA solved:", response);
    },
  });
  return verifier;
};
