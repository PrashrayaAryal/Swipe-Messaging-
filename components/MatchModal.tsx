import React from 'react';
import { UserProfile } from '../types';
import { HeartIcon, ChatBubbleIcon, CloseIcon } from './icons';

interface MatchModalProps {
  userProfile: UserProfile;
  matchedProfile: UserProfile;
  onClose: () => void;
  onChat: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ userProfile, matchedProfile, onClose, onChat }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-sm bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white text-center shadow-2xl animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>

        <h1 className="text-5xl font-extrabold italic" style={{fontFamily: "'Brush Script MT', cursive"}}>It's a Match!</h1>
        <p className="mt-2 text-lg">You and {matchedProfile.name} have liked each other.</p>

        <div className="flex justify-center items-center my-8 space-x-[-40px]">
          <div className="relative w-36 h-36 rounded-full border-4 border-white shadow-lg transform -rotate-12">
            <img src={userProfile.photo} alt="Your profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="relative w-36 h-36 rounded-full border-4 border-white shadow-lg transform rotate-12 z-10">
            <img src={matchedProfile.photo} alt={matchedProfile.name} className="w-full h-full object-cover rounded-full" />
             <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                <HeartIcon className="w-6 h-6 text-rose-500" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
            <button
                onClick={onChat}
                className="w-full flex items-center justify-center bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
            >
                <ChatBubbleIcon className="w-5 h-5 mr-2"/>
                Send a Message
            </button>
            <button
                onClick={onClose}
                className="w-full bg-transparent border-2 border-white/50 text-white font-bold py-3 px-4 rounded-full transform hover:bg-white/20 transition-all"
            >
                Keep Swiping
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default MatchModal;
