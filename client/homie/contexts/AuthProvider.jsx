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
      socket.on("getMessage", (message) => {
        setNewMessage(message);
      });
    }
  }, [socket]);

  useEffect(() => {
    const fetchChats = async () => {
      response = await getChats(profile._id);
      setChats(response ? response : []);
    };
    if (isLoggedIn) {
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
