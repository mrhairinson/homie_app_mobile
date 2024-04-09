import React, { createContext, useContext, useEffect, useState } from "react";
import { getChats } from "../apis";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    //listen when the message is received
    if (isLoggedIn) {
      console.log("Context socket");
      socket.on("getMessage", (message) => {
        setNewMessage(message);
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log("profile change", isLoggedIn);
    const fetchChats = async () => {
      response = await getChats(profile._id);
      console.log("Context update chats");
      setChats(response ? response : []);
    };
    if (isLoggedIn) {
      console.log("Context fetch chats");
      fetchChats();
    }
  }, [newMessage, profile]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        socket,
        setSocket,
        chats,
        setChats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
