import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <div className="flex flex-col items-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-2 animate-pop-in">AI Chat Assistant</h1>
            <p className="text-lg text-gray-200 font-medium animate-fade-in">How can I help you today?</p>
          </div>

          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i} className="space-y-2">
                    <div className="mb-2 flex items-end gap-2 animate-slide-up">
                      <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-2 rounded-full shadow-lg text-white text-2xl h-10 w-10 flex items-center justify-center">
                        <CgProfile />
                      </div>
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white shadow-md max-w-xl w-fit font-semibold text-lg animate-pop-in">
                        {e.question}
                      </div>
                    </div>
                    <div className="mb-4 flex items-end gap-2 animate-slide-up">
                      <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-full shadow-lg text-white text-2xl h-10 w-10 flex items-center justify-center">
                        <FaRobot />
                      </div>
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white shadow-md max-w-xl w-fit font-medium animate-pop-in">
                        <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No chat yet</p>
              )}

              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>
      </div>

      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]">
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center gap-2 animate-fade-in"
          >
            <input
              className="flex-grow py-4 px-6 bg-white/80 text-gray-800 rounded-2xl shadow-md outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-lg font-medium animate-input-pop"
              type="text"
              placeholder="Type your message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white text-2xl shadow-lg hover:scale-110 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-in">
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
