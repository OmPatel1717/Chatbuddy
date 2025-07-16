import React, { useState, useEffect } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { FaRobot } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [altTextIndex, setAltTextIndex] = useState(0);
  const altTexts = ["to ChatBuddy", "A strong AI chatbot"];
  const [displayed, setDisplayed] = useState(altTexts[0]);
  const [typing, setTyping] = useState(true);

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < altTexts[altTextIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(altTexts[altTextIndex].slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        setAltTextIndex((prev) => (prev + 1) % altTexts.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, altTextIndex, altTexts]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center relative" style={{ height: '4.5rem' }}>
            <span className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl tracking-tight mb-2 animate-fade-in whitespace-nowrap">Welcome</span>
            <span className="relative ml-4" style={{ width: '20ch', display: 'inline-block' }}>
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 block text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap typewriter-cursor"
                style={{ minWidth: '20ch', textAlign: 'left' }}
              >
                {displayed}
              </span>
            </span>
          </div>
        </div>
        <p className="text-base md:text-lg text-gray-200 font-medium mb-4 text-center animate-fade-in max-w-xl">Your smart AI companion for instant answers, friendly chats, and creative ideas. Sign in to start your conversation!</p>
      </div>
      <form
        className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200 animate-slide-up"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-3 rounded-full shadow-lg mb-2 animate-pop-in">
            <FaRobot className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1 animate-fade-in">AI Chat Assistant</h1>
          <span className="text-blue-600 font-semibold text-lg animate-fade-in">Sign in to continue</span>
        </div>
        <div className="mb-6 animate-fade-in">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1' /></svg>
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none bg-white/80 text-gray-800 shadow-sm hover:shadow-lg animate-input-pop"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-in"
          disabled={btnLoading}
          type="submit"
        >
          {btnLoading ? <LoadingSpinner /> : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
