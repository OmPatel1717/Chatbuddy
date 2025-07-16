import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";
import { FaRobot } from "react-icons/fa";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading } = UserData();

  const { fetchChats } = ChatData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 animate-fade-in">
      <form
        className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200 animate-slide-up"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-3 rounded-full shadow-lg mb-2 animate-pop-in">
            <FaRobot className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1 animate-fade-in">AI Chat Assistant</h1>
          <span className="text-blue-600 font-semibold text-lg animate-fade-in">Verify your account</span>
        </div>
        <div className="mb-6 animate-fade-in">
          <label className="block text-gray-700 mb-2 font-semibold" htmlFor="otp">
            OTP
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0v1a4 4 0 01-8 0v-1' /></svg>
            </span>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none bg-white/80 text-gray-800 shadow-sm hover:shadow-lg animate-input-pop"
              placeholder="Enter OTP"
              required
            />
          </div>
        </div>
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-in">
          {btnLoading ? <LoadingSpinner /> : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default Verify;
