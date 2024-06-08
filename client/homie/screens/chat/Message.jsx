import React, { useEffect, useState, useRef } from "react";
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
import {
  getChat,
  getMessages,
  createMessage,
  createChat,
  getChats,
  getUser,
} from "../../apis";
import { AntDesign } from "@expo/vector-icons";

const Message = ({ route, navigation }) => {
  const { profile, socket, setChats } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const receiverUser = route.params;
  const flatListRef = useRef(null);

  socket.on("getMessage", (message) => {
    const newMessage = message;
    if (newMessage.chatId === chatId) {
      setMessages([...messages, newMessage]);
      //Update trang thai da doc cua reciever
    }
  });

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    //Fetch messages from the server
    const fetchMessage = async () => {
      //tìm chat giữa 2 người
      const response = await getChat(profile._id, receiverUser?.receiverId);
      //Tìm tên người nhận
      const userReceiver = await getUser(receiverUser?.receiverId);
      //Update tên người nhận tin nhắn
      receiverUser.receiverName = userReceiver?.name;
      //Nếu chưa có thì tạo chat luôn
      if (!response) {
        let newChatId = await createChat({
          firstId: profile._id,
          secondId: receiverUser?.receiverId,
        });
        setChatId(newChatId);
      } else {
        //Nếu có rồi lấy ra chat ID
        setChatId(response._id);
        //Lấy message
        let messages = await getMessages(response._id);
        setMessages(messages);
        scrollToBottom();
      }
      setIsLoading(false);
    };
    fetchMessage();
    return () => {
      //Reset Stack tree
      navigation.navigate("Chats", {
        screen: "Chat",
      });
    };
  }, []);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") {
      return; // Don't send empty messages
    }
    const newMessage = {
      chatId,
      senderId: profile._id, // You can add logic here to differentiate sender if needed
      text: inputMessage,
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
    //Lưu message vào DB
    await createMessage(newMessage);
    //Emit socket message
    socket.emit("message", {
      chatId: chatId,
      senderId: profile._id,
      receiverId: receiverUser?.receiverId,
      message: inputMessage,
    });
    //Update chats
    const res = await getChats(profile._id);
    setChats(res ? res : []);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderId === profile._id
          ? styles.userMessage
          : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Tin nhắn</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.receiver}>Tới, {receiverUser?.receiverName}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#999999"
        />
        <TouchableOpacity
          disabled={isLoading}
          style={styles.sendButton}
          onPress={sendMessage}
        >
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
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
