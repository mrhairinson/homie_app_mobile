import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../../contexts/AuthProvider";
import ChatBox from "../../components/ChatBox";

const Chat = ({ navigation }) => {
  const { chats, profile } = useAuth();

  const renderItem = ({ item }) => (
    <View style={styles.chatItem}>
      <ChatBox chat={item} user={profile} navigateChat={navigateToChat} />
    </View>
  );

  const navigateToChat = (receiver) => {
    navigation.navigate("Chats", {
      screen: "Message",
      params: receiver,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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
});

export default Chat;
