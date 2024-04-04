import { Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { getUser, getNewestMessage } from "../apis";
import React from "react";
// import { useFetchRecipient } from "../hooks/useFetchRecipient";

const ChatBox = ({ chat, user, navigateChat }) => {
  //   const { reciver } = useFetchRecipient(chat, user);
  const [recipient, setRecipient] = useState(null);
  const [message, setMessage] = useState("");

  const recipientId = chat?.members.find((id) => id !== user?._id);
  useEffect(() => {
    //Get chat
    const getChat = async () => {
      //Get reciver name, id
      if (!recipientId) return null;
      let response = await getUser(recipientId);
      setRecipient(response);
      //Get last message
      response = await getNewestMessage(chat._id);
      setMessage(response);
    };
    getChat();
  }, []);
  return (
    <Pressable
      onPress={() => {
        navigateChat({
          receiverId: recipient?._id,
          receiverName: recipient?.name,
        });
      }}
    >
      <Text style={styles.chatName}>{recipient?.name}</Text>
      <Text style={styles.lastMessage}>
        {message?.senderId === user?._id
          ? `Bạn: ${message?.text}`
          : message?.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 16,
    color: "#666666",
  },
});

export default ChatBox;
