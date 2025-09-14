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
import React, { useState } from "react";
import { SparklesIcon } from "./icons";

interface LoginScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
  onBack: () => void;   // 👈 NEW
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center relative">
      
      {/* 👇 Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/20 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="text-center mb-8">
        <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
        <h1 className="text-4xl font-bold mt-4">Welcome Back</h1>
        <p className="text-lg mt-2">Login to continue swiping!</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm">
          Don’t have an account?{" "}
          <button
            onClick={onSignUp}
            className="font-bold underline hover:text-orange-200"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
