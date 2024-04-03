import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../../contexts/AuthProvider";
import AuthNavigator from "../../navigation/AuthNavigator";

const Chat = ({ navigation }) => {
  // const { isLoggedIn } = useAuth();
  const [chats, setChats] = useState([
    { id: "1", name: "John", lastMessage: "Hey, how are you?" },
    { id: "2", name: "Alice", lastMessage: "What are you up to?" },
    { id: "3", name: "Bob", lastMessage: "Lets meet up later." },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Pressable
        onPress={() => {
          console.log("Haha");
          navigation.navigate("Message", {
            receiverName: item.name,
            receiverId: item.id,
          });
        }}
      >
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </Pressable>
    </View>
  );

  useEffect(() => {
    console.log("Fetch Chat");
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 16,
    color: "#666666",
  },
});

export default Chat;
