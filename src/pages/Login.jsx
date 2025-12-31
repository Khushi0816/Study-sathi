import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // EMAIL VALIDATION FUNCTION
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = () => {
    setError("");

    // 1. empty check
    if (!email || !password) {
      setError("Please enter both Email and Password.");
      return;
    }

    // 2. valid email format check
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // 3. check user in localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No user found. Please sign up first.");
      return;
    }

    // 4. credentials check
    if (savedUser.email !== email || savedUser.password !== password) {
      setError("Incorrect Email or Password.");
      return;
    }

    // 5. success → store login flag
    localStorage.setItem("isLoggedIn", "true");

    setSuccess(true);

    setTimeout(() => {
      navigate("/Dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0718] text-white flex flex-col items-center justify-center px-6 relative">
      
      {/* HEADER */}
      <div className="w-full max-w-2xl flex justify-between items-center mt-[-40px]">
        <h1 className="text-3xl font-semibold text-[#EDE9FE] font-poppins">
          LOGIN
        </h1>

        <img
          src="/src/assets/logo/main-logo-rbg.png"
          alt="StudySathi"
          className="w-44"
        />
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-xl bg-transparent mt-4">

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-400 mb-3 text-sm font-semibold">{error}</p>
        )}

        {/* EMAIL */}
        <label className="text-xl font-nunito">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md bg-[#1c0d2a] border border-white/10 
                     focus:outline-none focus:border-[#A855F7]"
        />

        {/* PASSWORD */}
        <label className="text-xl font-nunito">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-4 mb-8 px-4 py-3 rounded-md bg-[#1c0d2a] border border-white/10 
                     focus:outline-none focus:border-[#A855F7]"
        />

        {/* LOGIN + SIGNUP BUTTONS */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handleLogin}
            className="px-12 py-2 bg-[#A855F7] rounded-lg text-lg font-poppins 
                       hover:bg-[#9333EA] transition"
          >
            Login
          </button>

          <Link
            to="/Signup"
            className="px-12 py-2 bg-[#A855F7] rounded-lg text-lg font-poppins 
                       hover:bg-[#9333EA] transition"
          >
            Sign Up
          </Link>
        </div>

        <p className="text-right text-sm mt-2 text-white/70">
          Don't have an account?
        </p>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1C002A] border border-[#A855F7] px-10 py-6 rounded-lg text-center shadow-xl">
            <p className="text-[#D7A4FF] text-xl font-poppins font-semibold">
              Login Successful! Redirecting...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
