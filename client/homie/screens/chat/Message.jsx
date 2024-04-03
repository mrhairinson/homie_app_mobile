import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import COLOR from "../../constants/color";
import { useAuth } from "../../contexts/AuthProvider";

// const SERVER_URL = "http://192.168.1.7:8080";

const Message = ({ route }) => {
  //   const { receiverId, receiverName } = route.params;
  const { profile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { receiverId, receiverName } = route
    ? route.params
    : { receiverId: "", receiverName: "" };
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = io(SERVER_URL);
    // setSocket(newSocket);
    // newSocket.on("connect", () => {
    //   console.log("Connected to server");
    // });
    //Fetch messages from the server
    console.log(
      "Get chat of senderID, and receiverId:\nSenderId:",
      profile._id,
      "\nReceiverId:",
      receiverId
    );
    // return () => {
    //   newSocket.disconnect();
    // };
  }, [profile]);

  const sendMessage = () => {
    if (inputMessage.trim() === "") {
      return; // Don't send empty messages
    }
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user", // You can add logic here to differentiate sender if needed
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.receiver}>Tới, {receiverName}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#999999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: "70%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E0E0",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  receiver: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOR.BLACK,
  },
});

export default Message;
