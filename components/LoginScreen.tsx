// // components/LoginScreen.tsx
// import React, { useState } from "react";
// import { SparklesIcon } from "./icons";

// interface LoginScreenProps {
//   onLogin: () => void;
//   onSignUp: () => void;
// }

// const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (username && password) {
//       // Mock login success
//       onLogin();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center">
//       <div className="text-center mb-8">
//         <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//         <h1 className="text-4xl font-bold mt-4">Welcome Back</h1>
//         <p className="text-lg mt-2">Login to continue swiping!</p>
//       </div>

//       <form onSubmit={handleLogin} className="space-y-6">
//         <div>
//           <label htmlFor="username" className="block text-sm font-medium">
//             Username
//           </label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             placeholder="Enter your username"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
//         >
//           Login
//         </button>
//       </form>

//       <div className="text-center mt-6">
//         <p className="text-sm">
//           Don’t have an account?{" "}
//           <button
//             onClick={onSignUp}
//             className="font-bold underline hover:text-orange-200"
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;


// components/LoginScreen.tsx
// import React, { useState } from "react";
// import { SparklesIcon } from "./icons";

// interface LoginScreenProps {
//   onLogin: () => void;
//   onSignUp: () => void;
//   onBack: () => void;   // 👈 NEW
// }

// const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, onBack }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (username && password) {
//       onLogin();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
      
//       {/* 👇 Back Arrow */}
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
//         <h1 className="text-4xl font-bold mt-4">Welcome Back</h1>
//         <p className="text-lg mt-2">Login to continue swiping!</p>
//       </div>

//       <form onSubmit={handleLogin} className="space-y-6">
//         <div>
//           <label htmlFor="username" className="block text-sm font-medium">
//             Username
//           </label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             placeholder="Enter your username"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
//         >
//           Login
//         </button>
//       </form>

//       <div className="text-center mt-6">
//         <p className="text-sm">
//           Don’t have an account?{" "}
//           <button
//             onClick={onSignUp}
//             className="font-bold underline hover:text-orange-200"
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen; 

{/* <input
  id="phone"
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="+97798XXXXXXXX"
  className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
  required
/> */}


// import React, { useState } from "react";
// import { SparklesIcon } from "./icons";

// interface LoginScreenProps {
//   onLogin: () => void;
//   onSignUp: () => void;
//   onBack: () => void;
// }

// const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, onBack }) => {
//   const [phone, setPhone] = useState("");     // 👈 FIXED
//   const [password, setPassword] = useState("");

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (phone && password) {
//       // check credentials from backend
//       onLogin();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
//       {/* Back arrow */}
//       <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/20 transition">
//         ←
//       </button>

//       <div className="text-center mb-8">
//         <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
//         <h1 className="text-4xl font-bold mt-4">Welcome Back</h1>
//         <p className="text-lg mt-2">Login to continue swiping!</p>
//       </div>

//       <form onSubmit={handleLogin} className="space-y-6">
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
//           <input
//             id="phone"
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="+97798XXXXXXXX"
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
//             required
//           />
//         </div>

//         <button type="submit" className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg">
//           Login
//         </button>
//       </form>

//       <div className="text-center mt-6">
//         <p className="text-sm">
//           Don’t have an account?{" "}
//           <button onClick={onSignUp} className="font-bold underline hover:text-orange-200">
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;



import React, { useState } from "react";
import { SparklesIcon } from "./icons";
import { API_BASE_URL } from "../config"; // ✅ Make sure you have this file

interface LoginScreenProps {
  onLogin: (user: any) => void;
  onSignUp: () => void;
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, onBack }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !password) {
      alert("Please enter both phone and password!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        alert("Login successful!");
        onLogin(data.user); // pass backend user data
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed! Check console for details.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
      {/* Back arrow */}
      <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/20 transition">
        ←
      </button>

      <div className="text-center mb-8">
        <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
        <h1 className="text-4xl font-bold mt-4">Welcome Back</h1>
        <p className="text-lg mt-2">Login to continue swiping!</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+97798XXXXXXXX"
            className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4"
            required
          />
        </div>

        <button type="submit" className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg">
          Login
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm">
          Don’t have an account?{" "}
          <button onClick={onSignUp} className="font-bold underline hover:text-orange-200">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
