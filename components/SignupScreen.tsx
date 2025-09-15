import React, { useState } from 'react';
import { UserProfile } from '../types';
import { auth, setupRecaptcha } from '../firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

interface SignupScreenProps {
  onSignupComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onSignupComplete, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setError('');
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    setLoading(true);
    try {
      const recaptchaVerifier = setupRecaptcha('recaptcha-container');
      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (!verificationId || !otp) {
      setError('OTP is required');
      return;
    }
    setLoading(true);
    try {
      const credential = await auth.signInWithCredential(
        auth.PhoneAuthProvider.credential(verificationId, otp)
      );
      // OTP verified, create user profile
      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        name,
        phone,
      };
      onSignupComplete(newUser);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="tel"
          placeholder="+977 980xxxxxxx"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {!verificationId ? (
          <button
            onClick={handleSendOtp}
            className="bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-green-500 text-white font-semibold rounded-lg py-2 hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div id="recaptcha-container"></div>

        <button
          onClick={onBack}
          className="mt-2 text-gray-500 hover:text-gray-700 font-semibold"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SignupScreen;
