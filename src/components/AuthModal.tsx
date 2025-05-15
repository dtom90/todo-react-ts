import { useState } from 'react';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  if (!open) return null;

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md min-w-[300px] relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-center">Sign in</h2>
        <button
          className="w-full py-2 px-4 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => handleOAuthLogin('google')}
        >
          Continue with Google
        </button>
        <button
          className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900"
          onClick={() => handleOAuthLogin('github')}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
} 