import React from 'react';
import { auth, provider } from '../firebaseConfig.js';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const cookies = new Cookies();
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-blue-500">
      <div className="auth p-6 rounded-lg bg-white shadow-md text-center">
        <p className="text-3xl mb-4 font-semibold">Sign In with Google</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={signInWithGoogle}
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
