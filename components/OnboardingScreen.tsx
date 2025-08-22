import React, { useState, useCallback } from 'react';
import { UserProfile } from '../types';
import { SparklesIcon } from './icons';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (name && bio && photo) {
      onComplete({
        id: 'user_profile',
        name,
        age: 25, // Mock age
        bio,
        photo,
      });
    }
  }, [name, bio, photo, onComplete]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-rose-400 to-orange-300 p-6 text-white justify-center">
      <div className="text-center mb-8">
        <SparklesIcon className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
        <h1 className="text-4xl font-bold mt-4">Create Your Profile</h1>
        <p className="text-lg mt-2">Let's get you ready to mingle!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center border-4 border-white border-dashed hover:bg-white/40 transition-colors">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile preview" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-sm text-center">Tap to add photo</span>
              )}
            </div>
          </label>
          <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium">Short Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full bg-white/30 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-white transition"
            rows={3}
            placeholder="Something about you..."
            maxLength={150}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!name || !bio || !photo}
          className="w-full bg-white text-rose-500 font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform disabled:bg-gray-300 disabled:text-gray-500 disabled:scale-100"
        >
          Start Swiping
        </button>
      </form>
    </div>
  );
};

export default OnboardingScreen;
