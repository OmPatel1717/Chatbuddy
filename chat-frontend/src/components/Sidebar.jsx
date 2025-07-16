import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";
import { FaRobot } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();

  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("are you sure you want to delete this chat")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };
  return (
    <div
      className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircle />
      </button>

      <div className="flex items-center gap-2 mb-8 animate-pop-in">
        <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-2 rounded-full shadow-lg">
          <FaRobot className="text-white text-2xl" />
        </div>
        <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">AI Chat Assistant</span>
      </div>
      <div className="mb-6">
        <button
          onClick={createChat}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-in flex items-center justify-center gap-2"
        >
          {createLod ? <LoadingSpinner /> : (<><span className='text-xl'>+</span> New Chat</>)}
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Recent</p>
        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <button
                key={e._id}
                className="w-full text-left py-3 px-4 bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 rounded-xl mt-2 flex justify-between items-center shadow-md transition-all duration-200 animate-fade-in"
                onClick={() => clickEvent(e._id)}
              >
                <span className="truncate font-medium text-white">{e.latestMessage.slice(0, 38)}...</span>
                <button
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xl px-3 py-2 rounded-md hover:scale-110 hover:from-red-600 hover:to-pink-600 shadow-lg transition-all duration-200 animate-bounce-in"
                  onClick={(ev) => {ev.stopPropagation(); deleteChatHandler(e._id);}}
                >
                  <MdDelete />
                </button>
              </button>
            ))
          ) : (
            <p className="text-white">No chats yet</p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 mb-6 w-full">
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg shadow-md hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-300 animate-bounce-in flex items-center justify-center gap-2"
          onClick={logoutHandler}
        >
          <span className='text-xl'>⎋</span> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
