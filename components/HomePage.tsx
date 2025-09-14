// components/HomePage.tsx
import React from "react";

interface HomePageProps {
  onLogin: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gradient-to-r from-rose-400 to-orange-400 p-4 text-white shadow-md">
        <h1 className="text-2xl font-bold">SwipeMate</h1>
        <button
          onClick={onLogin}
          className="bg-white text-rose-500 font-semibold py-2 px-4 rounded-full shadow hover:scale-105 transition-transform"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center p-6 bg-gradient-to-b from-orange-50 to-white">
        <h2 className="text-4xl font-extrabold text-rose-500 mb-4">
          Meet. Match. Mingle.
        </h2>
        <p className="text-lg text-gray-600 max-w-xl">
          SwipeMate makes meeting new people fun and exciting! Whether you’re
          looking for friendship, love, or just great conversations — we’ve got
          you covered.
        </p>

        <div className="mt-8">
          <img
            src="https://illustrations.popsy.co/gray/love.svg"
            alt="Dating illustration"
            className="w-64 mx-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SwipeMate • Built for fun 💖
      </footer>
    </div>
  );
};

export default HomePage;
