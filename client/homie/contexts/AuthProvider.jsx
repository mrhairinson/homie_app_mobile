import React, { createContext, useContext, useEffect, useState } from "react";
import { getChats } from "../apis";
import { getAllPost } from "../apis";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const result = await getAllPost();
      setPosts(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  useEffect(() => {
    fetchPost();
  }, []);

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
        posts,
        setPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
