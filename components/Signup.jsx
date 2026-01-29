import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 font-['Roboto']">
      <form onSubmit={handleSignup} className="bg-[#1a1a1a] border border-[#2d2d2d] p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#d6b67b]">Sign Up</h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black border border-[#2d2d2d] p-2 rounded-md text-white focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-black border border-[#2d2d2d] p-2 rounded-md text-white focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-[#c7ad7f] text-black py-2 rounded-md hover:bg-[#b89d6a] transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </form>
    </section>
  );
};