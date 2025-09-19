import React from "react";
import { UserProfile, AppView } from "../types";

interface ProfileScreenProps {
  currentUser: UserProfile;
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentUser, onBack }) => {
  return (
    <div className="flex flex-col items-center p-6">
      <img
        src={currentUser.photo}
        alt={currentUser.name}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold">{currentUser.name}</h2>
      <p className="text-gray-600">{currentUser.bio}</p>

      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Back
      </button>
    </div>
  );
};

export default ProfileScreen;
