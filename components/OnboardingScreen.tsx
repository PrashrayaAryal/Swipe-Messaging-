
// import React, { useState, useCallback } from "react";
// import { UserProfile } from "../types";
// import { SparklesIcon } from "./icons";
// import { auth, setupRecaptcha } from "../firebase";
// import { signInWithPhoneNumber } from "firebase/auth";

// interface OnboardingScreenProps {
//   onComplete: (profile: UserProfile) => void;
//   onBack: () => void;
// }

// const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
//   onComplete,
//   onBack,
// }) => {
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

//   const sendOtp = async (p0?: string) => {
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
//     <div className="h-screen flex flex-col bg-gradient-to-b from-rose-400 to-orange-300 text-white">
//   {/* Sticky Back Button */}
//   <div className="sticky top-0 z-20 p-4 bg-transparent">
//     <button onClick={onBack} className="p-2 rounded-full hover:bg-white/20 transition">
//       ←
//     </button>
//   </div>

//   {/* Scrollable content */}
//   <div className="flex-1 hide-scrollbar px-6 py-4">
//           <div className="text-center mb-8 mt-4">
//             <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//             <h1 className="text-4xl font-bold mt-4">Create Your Account</h1>
//             <p className="text-lg mt-2">
//               Verify phone, then set up your profile
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6 pb-12">
//             {/* Phone + OTP */}
//             <div>
//               <label className="block text-sm font-medium">Phone Number</label>
//               {/* Flex container for +977 and input */}
//               <div className="flex items-center bg-white/30 rounded-lg overflow-hidden">
//                 <span className="px-4 text-white">+977</span>
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="98XXXXXXXX"
//                   className="flex-1 py-3 px-4 bg-transparent border-none text-white placeholder-white/70"
//                   required
//                 />
//               </div>

//               {/* Send OTP Button */}
//               {!otpSent ? (
//                 <button
//                   type="button"
//                   onClick={() => sendOtp(`+977${phone}`)}
//                   className="mt-2 bg-white text-rose-500 px-4 py-2 rounded-full"
//                 >
//                   Send OTP
//                 </button>
//               ) : (
//                 <div className="mt-2 space-y-2">
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     placeholder="Enter OTP"
//                     className="w-full bg-white/30 border-none rounded-lg py-2 px-4"
//                   />
//                   <button
//                     type="button"
//                     onClick={verifyOtp}
//                     className="bg-white text-rose-500 px-4 py-2 rounded-full"
//                   >
//                     Verify OTP
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//                 required
//               />
//             </div>

//             {/* Bio */}
//             <div>
//               <label className="block text-sm font-medium">Short Bio</label>
//               <textarea
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//                 rows={3}
//                 maxLength={150}
//                 required
//               />
//             </div>

//             {/* Photo Upload */}
//             <div className="flex justify-center">
//               <label htmlFor="photo-upload" className="cursor-pointer">
//                 <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
//                   {photoPreview ? (
//                     <img
//                       src={photoPreview}
//                       alt="Profile preview"
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-sm text-center">
//                       Tap to add photo
//                     </span>
//                   )}
//                 </div>
//               </label>
//               <input
//                 id="photo-upload"
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handlePhotoUpload}
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={!otpVerified}
//               className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg"
//             >
//               Finish Signup
//             </button>
//           </form>

//           {/* Firebase Recaptcha */}
//           <div id="recaptcha-container" className="mt-4"></div>
//         </div>
//       </div>
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
//       const fullPhone = `+977${phone}`;
//       const verifier = setupRecaptcha("recaptcha-container");
//       await verifier.render(); // ensure recaptcha is ready
//       const confirmation = await signInWithPhoneNumber(auth, fullPhone, verifier);
//       setConfirmationResult(confirmation);
//       setOtpSent(true);
//       alert("OTP sent!");
//     } catch (error: any) {
//       console.error("OTP Error:", error);
//       alert(error.message || "Failed to send OTP. Make sure the number is valid (+97798XXXXXXX).");
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
//     <div className="h-screen flex flex-col bg-gradient-to-b from-rose-400 to-orange-300 text-white">
//       {/* Sticky Back Button */}
//       <div className="sticky top-0 z-20 p-4 bg-transparent">
//         <button onClick={onBack} className="p-2 rounded-full hover:bg-white/20 transition">
//           ←
//         </button>
//       </div>

//       {/* Scrollable content */}
//       <div className="flex-1 hide-scrollbar px-6 py-4 overflow-y-auto">
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
//             <div className="flex items-center bg-white/30 rounded-lg overflow-hidden">
//               <span className="px-4 text-white">+977</span>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="98XXXXXXXX"
//                 className="flex-1 py-3 px-4 bg-transparent border-none text-white placeholder-white/70"
//                 required
//               />
//             </div>

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

  const sendOtp = async () => {
    if (!phone) return;
    try {
      const fullPhone = `+977${phone}`;
      const verifier = setupRecaptcha("recaptcha-container");
      await verifier.render();
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, verifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP sent!");
    } catch (error: any) {
      console.error("OTP Error:", error);
      alert(error.message || "Failed to send OTP. Make sure the number is valid (+97798XXXXXXX).");
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      setOtpVerified(true);
      alert("Phone verified!");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

const handleSubmit = useCallback(
  async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !bio || !password || !photo || !otpVerified) {
      alert("Please complete all fields and verify phone!");
      return;
    }

    console.log("Sending signup request:", { name, phone, password, bio, photo });

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, password, bio, photo }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        alert("Signup successful!");
        onComplete({
          id: data.user._id,
          name: data.user.name,
          bio: data.user.bio,
          photo: data.user.photo,
          age: 25,
        });
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Signup failed! Check console for details.");
    }
  },
  [name, bio, password, phone, photo, otpVerified, onComplete]
);



  // const handleSubmit = useCallback(
  //   async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     if (!name || !bio || !password || !photo || !otpVerified) {
  //       alert("Please complete all fields and verify phone!");
  //       return;
  //     }

  //     try {
  //       const response = await fetch("http://localhost:5000/api/auth/signup", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ name, phone, password, bio, photo }),
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         alert("Signup successful!");
  //         onComplete({
  //           id: data.user._id,
  //           name: data.user.name,
  //           bio: data.user.bio,
  //           photo: data.user.photo,
  //         });
  //       } else {
  //         alert(data.message || "Signup failed!");
  //       }
  //     } catch (err: any) {
  //       console.error("Signup Error:", err);
  //       alert(err.message || "Signup failed!");
  //     }
  //   },
  //   [name, bio, password, phone, photo, otpVerified, onComplete]
  // );

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-rose-400 to-orange-300 text-white">
      <div className="sticky top-0 z-20 p-4 bg-transparent">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/20 transition">
          ←
        </button>
      </div>

      <div className="flex-1 hide-scrollbar px-6 py-4 overflow-y-auto">
        <div className="text-center mb-8 mt-4">
          <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
          <h1 className="text-4xl font-bold mt-4">Create Your Account</h1>
          <p className="text-lg mt-2">Verify phone, then set up your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-12">
          {/* Phone + OTP */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="flex items-center bg-white/30 rounded-lg overflow-hidden">
              <span className="px-4 text-white">+977</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="flex-1 py-3 px-4 bg-transparent border-none text-white placeholder-white/70"
                required
              />
            </div>

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

        <div id="recaptcha-container" className="mt-4"></div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
