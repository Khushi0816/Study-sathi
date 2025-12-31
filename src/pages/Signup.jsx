import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [success, setSuccess] = useState(false);

  // Email Validation
  const validateEmail = (value) => {
    setEmail(value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!value) setEmailError("Email is required");
    else if (!regex.test(value)) setEmailError("Please enter a valid email");
    else setEmailError("");
  };

  // Username Validation
  const validateUsername = (value) => {
    setUsername(value);
    if (!value.trim()) setUsernameError("Username is required");
    else setUsernameError("");
  };

  // Password Validation
  const validatePassword = (value) => {
    setPassword(value);

    if (!value) setPasswordError("Password is required");
    else if (value.length < 6)
      setPasswordError("Minimum 6 characters required");
    else setPasswordError("");
  };

  // Confirm Password Validation
  const validateConfirm = (value) => {
    setConfirm(value);

    if (!value) setConfirmError("Please confirm your password");
    else if (value !== password)
      setConfirmError("Passwords do not match");
    else setConfirmError("");
  };

  // SIGNUP HANDLER
  const handleSignup = () => {
    // Check Errors (live validation)
    if (usernameError || emailError || passwordError || confirmError) return;

    // Check empty fields
    if (!username || !email || !password || !confirm) {
      alert("Please fill all fields");
      return;
    }

    // Check if user already exists
    const existing = JSON.parse(localStorage.getItem("user"));
    if (existing && existing.email === email) {
      alert("Account already exists. Please Login.");
      return;
    }

    // Save user in localStorage
    const newUser = {
      name: username,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    // Success Popup
    setSuccess(true);

    setTimeout(() => {
      navigate("/UploadPage"); // redirect as you wanted
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0718] text-white flex flex-col items-center justify-center px-6 relative">
      
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-1 mt-[-30px]">
        <h1 className="text-3xl font-semibold text-[#EDE9FE] font-poppins">
          Sign Up
        </h1>

        <img
          src="/src/assets/logo/main-logo-rbg.png"
          alt="StudySathi"
          className="w-48"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-xl bg-transparent">

        {/* USERNAME */}
        <label className="text-lg font-nunito">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => validateUsername(e.target.value)}
          className="w-full mb-1 px-4 py-3 rounded-md bg-[#1c0d2a] border border-white/10 focus:outline-none focus:border-[#A855F7]"
        />
        {usernameError && <p className="text-red-400 text-sm mb-3">{usernameError}</p>}

        {/* EMAIL */}
        <label className="text-lg font-nunito">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
          className={`w-full mb-1 px-4 py-3 rounded-md bg-[#1c0d2a] border 
            ${emailError ? "border-red-500" : "border-white/10 focus:border-[#A855F7]"}
            focus:outline-none`}
        />
        {emailError && <p className="text-red-400 text-sm mb-3">{emailError}</p>}

        {/* PASSWORD */}
        <label className="text-lg font-nunito">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          className={`w-full mb-1 mt-1 px-4 py-3 rounded-md bg-[#1c0d2a] border 
            ${passwordError ? "border-red-500" : "border-white/10 focus:border-[#A855F7]"}
            focus:outline-none`}
        />
        {passwordError && <p className="text-red-400 text-sm mb-3">{passwordError}</p>}

        {/* CONFIRM PASSWORD */}
        <label className="text-lg font-nunito">Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => validateConfirm(e.target.value)}
          className={`w-full mb-1 mt-1 px-4 py-3 rounded-md bg-[#1c0d2a] border 
            ${confirmError ? "border-red-500" : "border-white/10 focus:border-[#A855F7]"}
            focus:outline-none`}
        />
        {confirmError && <p className="text-red-400 text-sm mb-3">{confirmError}</p>}

        {/* BUTTONS */}
        <div className="flex items-center justify-between w-full mt-2">
          <button
            className="px-12 py-2 bg-[#A855F7] rounded-lg text-lg font-poppins hover:bg-[#9333EA] transition"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <Link
            to="/Login"
            className="px-12 py-2 bg-[#A855F7] rounded-lg text-lg font-poppins hover:bg-[#9333EA] transition"
          >
            Login
          </Link>
        </div>

        <p className="text-right text-sm mt-2 text-white/70">
          Already have an account?
        </p>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1C002A] border border-[#A855F7] px-10 py-6 rounded-lg text-center shadow-xl">
            <p className="text-[#D7A4FF] text-xl font-poppins font-semibold">
              🎉 Account created successfully!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
