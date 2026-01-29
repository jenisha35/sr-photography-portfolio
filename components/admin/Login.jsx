import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../src/config/firebase';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ NEW
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email !== "srrigash@gmail.com") {
        setErrorMsg("Unauthorized access. Admin only.");
        await signOut(auth);
        return;
      }

      navigate('/admin');
    } catch (error) {
      setErrorMsg("Invalid credentials or user not found.");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMsg("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMsg("Password reset email sent. Please check your inbox.");
      setErrorMsg('');
    } catch (error) {
      setErrorMsg("Failed to send reset email. Try again.");
    }
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4 font-['Roboto']">
      <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-xl border border-[#2d2d2d] w-full max-w-md">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#d6b67b] mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-black border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#c7ad7f]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pr-10 rounded bg-black border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#c7ad7f]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-sm text-[#aaa] hover:text-white focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errorMsg && <p className="text-sm text-red-500 text-center">{errorMsg}</p>}
          {infoMsg && <p className="text-sm text-green-500 text-center">{infoMsg}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#775A32] via-[#902428] to-[#5C4929] py-3 rounded text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleResetPassword}
            className="text-sm text-blue-400 hover:underline block text-center mt-2"
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
