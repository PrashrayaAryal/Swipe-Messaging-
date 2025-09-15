// import React, { useState, useCallback } from 'react';
// import { UserProfile } from '../types';
// import { SparklesIcon } from './icons';

// interface OnboardingScreenProps {
//   onComplete: (profile: UserProfile) => void;
// }

// const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
//   const [name, setName] = useState('');
//   const [bio, setBio] = useState('');
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result as string);
//         setPhotoPreview(URL.createObjectURL(file));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = useCallback((e: React.FormEvent) => {
//     e.preventDefault();
//     if (name && bio && photo) {
//       onComplete({
//         id: 'user_profile',
//         name,
//         age: 25, // Mock age
//         bio,
//         photo,
//       });
//     }
//   }, [name, bio, photo, onComplete]);

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center">
//       <div className="text-center mb-8">
//         <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//         <h1 className="text-4xl font-bold mt-4">Create Your Profile</h1>
//         <p className="text-lg mt-2">Let's get you ready to mingle!</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex justify-center">
//           <label htmlFor="photo-upload" className="cursor-pointer">
//             <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
//               {photoPreview ? (
//                 <img src={photoPreview} alt="Profile preview" className="w-full h-full rounded-full object-cover" />
//               ) : (
//                 <span className="text-sm text-center">Tap to add photo</span>
//               )}
//             </div>
//           </label>
//           <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
//         </div>

//         <div>
//           <label htmlFor="name" className="block text-sm font-medium">Name</label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             placeholder="Your name"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="bio" className="block text-sm font-medium">Short Bio</label>
//           <textarea
//             id="bio"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             rows={3}
//             placeholder="Something about you..."
//             maxLength={150}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={!name || !bio || !photo}
//           className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform disabled:bg-gray-300 disabled:text-gray-500 disabled:scale-100"
//         >
//           Start Swiping
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OnboardingScreen;

// components/OnboardingScreen.tsx


// components/OnboardingScreen.tsx
// import React, { useState, useCallback } from 'react';
// import { UserProfile } from '../types';
// import { SparklesIcon } from './icons';

// interface OnboardingScreenProps {
//   onComplete: (profile: UserProfile) => void;
//   onBack: () => void;   // 👈 back to login
// }

// const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onBack }) => {
//   const [name, setName] = useState('');
//   const [bio, setBio] = useState('');
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result as string);
//         setPhotoPreview(URL.createObjectURL(file));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = useCallback((e: React.FormEvent) => {
//     e.preventDefault();
//     if (name && bio && photo) {
//       onComplete({
//         id: 'user_profile',
//         name,
//         age: 25, // Mock age
//         bio,
//         photo,
//       });
//     }
//   }, [name, bio, photo, onComplete]);

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
      
//       {/* 👇 Back arrow top-left */}
//       <button
//         type="button"
//         onClick={onBack}
//         className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/20 transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <div className="text-center mb-8">
//         <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//         <h1 className="text-4xl font-bold mt-4">Create Your Profile</h1>
//         <p className="text-lg mt-2">Let's get you ready to mingle!</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex justify-center">
//           <label htmlFor="photo-upload" className="cursor-pointer">
//             <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
//               {photoPreview ? (
//                 <img src={photoPreview} alt="Profile preview" className="w-full h-full rounded-full object-cover" />
//               ) : (
//                 <span className="text-sm text-center">Tap to add photo</span>
//               )}
//             </div>
//           </label>
//           <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
//         </div>

//         <div>
//           <label htmlFor="name" className="block text-sm font-medium">Name</label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             placeholder="Your name"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="bio" className="block text-sm font-medium">Short Bio</label>
//           <textarea
//             id="bio"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             rows={3}
//             placeholder="Something about you..."
//             maxLength={150}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={!name || !bio || !photo}
//           className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform disabled:bg-gray-300 disabled:text-gray-500 disabled:scale-100"
//         >
//           Start Swiping
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OnboardingScreen;


// components/OnboardingScreen.tsx
// import React, { useState, useCallback } from "react";
// import { UserProfile } from "../types";
// import { SparklesIcon } from "./icons";
// import { auth, setupRecaptcha } from "../firebase"; // <-- setup Firebase first
// import { signInWithPhoneNumber } from "firebase/auth";

// interface OnboardingScreenProps {
//   onComplete: (profile: UserProfile) => void;
//   onBack: () => void;
// }

// const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onBack }) => {
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState<any>(null);

//   const [photo, setPhoto] = useState<string | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result as string);
//         setPhotoPreview(URL.createObjectURL(file));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Send OTP
//   const sendOtp = async () => {
//   if (!phone) return;
//   const verifier = setupRecaptcha("recaptcha-container"); // ✅ now correct type
//   const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
//   setConfirmationResult(confirmation);
//   setOtpSent(true);
// };

//     alert("OTP sent!");
//   };

//   // Verify OTP
//   const verifyOtp = async () => {
//     if (!confirmationResult) return;
//     try {
//       await confirmationResult.confirm(otp);
//       setOtpVerified(true);
//       alert("Phone verified!");
//     } catch {
//       alert("Invalid OTP");
//     }
//   };

//   const handleSubmit = useCallback(
//     (e: React.FormEvent) => {
//       e.preventDefault();
//       if (name && bio && password && photo && otpVerified) {
//         onComplete({
//           id: "user_profile",
//           name,
//           age: 25, // placeholder
//           bio,
//           photo,
//           // Save phone & password to backend instead of profile object
//         });
//       } else {
//         alert("Please complete all fields and verify phone!");
//       }
//     },
//     [name, bio, password, photo, otpVerified, onComplete]
//   );

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
//       {/* Back arrow */}
//       <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/20 transition">
//         ←
//       </button>

//       <div className="text-center mb-8">
//         <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//         <h1 className="text-4xl font-bold mt-4">Create Your Account</h1>
//         <p className="text-lg mt-2">Verify phone, then set up your profile</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Phone + OTP */}
//         <div>
//           <label className="block text-sm font-medium">Phone Number</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="+97798XXXXXXXX"
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//             required
//           />
//           {!otpSent ? (
//             <button type="button" onClick={sendOtp} className="mt-2 bg-white text-rose-500 px-4 py-2 rounded-full">
//               Send OTP
//             </button>
//           ) : (
//             <div className="mt-2">
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter OTP"
//                 className="w-full bg-white/30 border-none rounded-lg py-2 px-4"
//               />
//               <button type="button" onClick={verifyOtp} className="mt-2 bg-white text-rose-500 px-4 py-2 rounded-full">
//                 Verify OTP
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Name, Bio, Password */}
//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Short Bio</label>
//           <textarea
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//             rows={3}
//             maxLength={150}
//             required
//           />
//         </div>

//         {/* Photo */}
//         <div className="flex justify-center">
//           <label htmlFor="photo-upload" className="cursor-pointer">
//             <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
//               {photoPreview ? (
//                 <img src={photoPreview} alt="Profile preview" className="w-full h-full rounded-full object-cover" />
//               ) : (
//                 <span className="text-sm text-center">Tap to add photo</span>
//               )}
//             </div>
//           </label>
//           <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={!otpVerified}
//           className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg"
//         >
//           Finish Signup
//         </button>
//       </form>

//       {/* Firebase Recaptcha container */}
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default OnboardingScreen;


// import React, { useState, useCallback } from "react";
// import { UserProfile } from "../types";
// import { SparklesIcon } from "./icons";
// import { auth, setupRecaptcha } from "../firebase";
// import { signInWithPhoneNumber } from "firebase/auth";

// interface OnboardingScreenProps {
//   onComplete: (profile: UserProfile) => void;
//   onBack: () => void;
// }

// const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onBack }) => {
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState<any>(null);
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result as string);
//         setPhotoPreview(URL.createObjectURL(file));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const sendOtp = async () => {
//     if (!phone) return;
//     try {
//       const verifier = setupRecaptcha("recaptcha-container");
//       const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
//       setConfirmationResult(confirmation);
//       setOtpSent(true);
//       alert("OTP sent!");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to send OTP. Try again.");
//     }
//   };

//   const verifyOtp = async () => {
//     if (!confirmationResult) return;
//     try {
//       await confirmationResult.confirm(otp);
//       setOtpVerified(true);
//       alert("Phone verified!");
//     } catch (error) {
//       console.error(error);
//       alert("Invalid OTP");
//     }
//   };

//   const handleSubmit = useCallback(
//     (e: React.FormEvent) => {
//       e.preventDefault();
//       if (name && bio && password && photo && otpVerified) {
//         onComplete({
//           id: "user_profile",
//           name,
//           age: 25,
//           bio,
//           photo,
//         });
//       } else {
//         alert("Please complete all fields and verify phone!");
//       }
//     },
//     [name, bio, password, photo, otpVerified, onComplete]
//   );

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
//       {/* Sticky Back Button */}
//       <div className="sticky top-0 z-20 p-4 bg-transparent">
//         <button
//           onClick={onBack}
//           className="p-2 rounded-full hover:bg-white/20 transition"
//         >
//           ←
//         </button>
//       </div>

//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-y-auto px-6 py-4">
//         {/* Header */}
//         <div className="text-center mb-8 mt-4">
//           <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//           <h1 className="text-4xl font-bold mt-4">Create Your Account</h1>
//           <p className="text-lg mt-2">Verify phone, then set up your profile</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6 pb-12">
//           {/* Phone + OTP */}
//           <div>
//             <label className="block text-sm font-medium">Phone Number</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="+97798XXXXXXXX"
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//               required
//             />
//             {!otpSent ? (
//               <button
//                 type="button"
//                 onClick={sendOtp}
//                 className="mt-2 bg-white text-rose-500 px-4 py-2 rounded-full"
//               >
//                 Send OTP
//               </button>
//             ) : (
//               <div className="mt-2 space-y-2">
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                   className="w-full bg-white/30 border-none rounded-lg py-2 px-4"
//                 />
//                 <button
//                   type="button"
//                   onClick={verifyOtp}
//                   className="bg-white text-rose-500 px-4 py-2 rounded-full"
//                 >
//                   Verify OTP
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//               required
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block text-sm font-medium">Short Bio</label>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//               rows={3}
//               maxLength={150}
//               required
//             />
//           </div>

//           {/* Photo Upload */}
//           <div className="flex justify-center">
//             <label htmlFor="photo-upload" className="cursor-pointer">
//               <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt="Profile preview"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-sm text-center">Tap to add photo</span>
//                 )}
//               </div>
//             </label>
//             <input
//               id="photo-upload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handlePhotoUpload}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={!otpVerified}
//             className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg"
//           >
//             Finish Signup
//           </button>
//         </form>

//         {/* Firebase Recaptcha */}
//         <div id="recaptcha-container" className="mt-4"></div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingScreen;


// import React, { useState, useCallback } from "react";
// import { UserProfile } from "../types";
// import { SparklesIcon } from "./icons";
// import { auth, setupRecaptcha } from "../firebase";
// import { signInWithPhoneNumber } from "firebase/auth";

// interface OnboardingScreenProps {
//   onComplete: (profile: UserProfile) => void;
//   onBack: () => void;
// }

// const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onBack }) => {
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState<any>(null);
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result as string);
//         setPhotoPreview(URL.createObjectURL(file));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const sendOtp = async () => {
//     if (!phone) return;
//     try {
//       const verifier = setupRecaptcha("recaptcha-container"); // ✅ bind reCAPTCHA
//       const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
//       setConfirmationResult(confirmation);
//       setOtpSent(true);
//       alert("OTP sent!");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to send OTP. Check number format (+97798XXXXXXX).");
//     }
//   };

//   const verifyOtp = async () => {
//     if (!confirmationResult) return;
//     try {
//       await confirmationResult.confirm(otp);
//       setOtpVerified(true);
//       alert("Phone verified!");
//     } catch (error) {
//       console.error(error);
//       alert("Invalid OTP");
//     }
//   };

//   const handleSubmit = useCallback(
//     async (e: React.FormEvent) => {
//       e.preventDefault();
//       if (name && bio && password && photo && otpVerified) {
//         try {
//           // ✅ Call backend API
//           const res = await fetch("http://localhost:5000/api/auth/signup", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               phone,
//               password,
//               name,
//               bio,
//               photo,
//             }),
//           });

//           if (res.ok) {
//             const data = await res.json();
//             onComplete({
//               id: data.user.id,
//               name,
//               age: 25,
//               bio,
//               photo,
//             });
//           } else {
//             alert("Signup failed. Try again.");
//           }
//         } catch (err) {
//           console.error(err);
//           alert("Error connecting to server.");
//         }
//       } else {
//         alert("Please complete all fields and verify phone!");
//       }
//     },
//     [name, bio, password, photo, otpVerified, phone, onComplete]
//   );

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
//       {/* Sticky Back Button */}
//       <div className="sticky top-0 z-20 p-4 bg-transparent">
//         <button
//           onClick={onBack}
//           className="p-2 rounded-full hover:bg-white/20 transition"
//         >
//           ←
//         </button>
//       </div>

//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-y-auto px-6 py-4">
//         {/* Header */}
//         <div className="text-center mb-8 mt-4">
//           <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//           <h1 className="text-4xl font-bold mt-4">Create Your Account</h1>
//           <p className="text-lg mt-2">Verify phone, then set up your profile</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6 pb-12">
//           {/* Phone + OTP */}
//           <div>
//             <label className="block text-sm font-medium">Phone Number</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="+97798XXXXXXXX"
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 text-black"
//               required
//             />
//             {!otpSent ? (
//               <button
//                 type="button"
//                 onClick={sendOtp}
//                 className="mt-2 bg-white text-rose-500 px-4 py-2 rounded-full"
//               >
//                 Send OTP
//               </button>
//             ) : (
//               <div className="mt-2 space-y-2">
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                   className="w-full bg-white/30 border-none rounded-lg py-2 px-4 text-black"
//                 />
//                 <button
//                   type="button"
//                   onClick={verifyOtp}
//                   className="bg-white text-rose-500 px-4 py-2 rounded-full"
//                 >
//                   Verify OTP
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 text-black"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 text-black"
//               required
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label className="block text-sm font-medium">Short Bio</label>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 text-black"
//               rows={3}
//               maxLength={150}
//               required
//             />
//           </div>

//           {/* Photo Upload */}
//           <div className="flex justify-center">
//             <label htmlFor="photo-upload" className="cursor-pointer">
//               <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt="Profile preview"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-sm text-center text-black">Tap to add photo</span>
//                 )}
//               </div>
//             </label>
//             <input
//               id="photo-upload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handlePhotoUpload}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={!otpVerified}
//             className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg disabled:opacity-50"
//           >
//             Finish Signup
//           </button>
//         </form>

//         {/* Firebase Recaptcha */}
//         <div id="recaptcha-container" className="mt-4"></div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingScreen;


import React, { useState, useCallback } from "react";
import { UserProfile } from "../types";
import { SparklesIcon } from "./icons";
import { auth, setupRecaptcha } from "../firebase";
import { signInWithPhoneNumber } from "firebase/auth";

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onBack }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setPhotoPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Fixed sendOtp with explicit render
  const sendOtp = async () => {
    if (!phone) return;
    try {
      const verifier = setupRecaptcha("recaptcha-container");
      await verifier.render(); // ensure reCAPTCHA is active
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP sent!");
    } catch (error: any) {
      console.error("OTP Error:", error);
      alert(error.message || "Failed to send OTP. Check number format (+97798XXXXXXX).");
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      setOtpVerified(true);
      alert("Phone verified!");
    } catch (error: any) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (name && bio && password && photo && otpVerified) {
        onComplete({
          id: "user_profile",
          name,
          age: 25,
          bio,
          photo,
        });
      } else {
        alert("Please complete all fields and verify phone!");
      }
    },
    [name, bio, password, photo, otpVerified, onComplete]
  );

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
      {/* Sticky Back Button */}
      <div className="sticky top-0 z-20 p-4 bg-transparent">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          ←
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
          <h1 className="text-4xl font-bold mt-4">Create Your Account</h1>
          <p className="text-lg mt-2">Verify phone, then set up your profile</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 pb-12">
          {/* Phone + OTP */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+97798XXXXXXXX"
              className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
              required
            />
            {!otpSent ? (
              <button
                type="button"
                onClick={sendOtp}
                className="mt-2 bg-white text-rose-500 px-4 py-2 rounded-full"
              >
                Send OTP
              </button>
            ) : (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full bg-white/30 border-none rounded-lg py-2 px-4"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="bg-white text-rose-500 px-4 py-2 rounded-full"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium">Short Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
              rows={3}
              maxLength={150}
              required
            />
          </div>

          {/* Photo Upload */}
          <div className="flex justify-center">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-center">Tap to add photo</span>
                )}
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!otpVerified}
            className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg"
          >
            Finish Signup
          </button>
        </form>

        {/* Firebase Recaptcha */}
        <div id="recaptcha-container" className="mt-4"></div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
