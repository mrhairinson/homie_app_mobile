import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../../contexts/AuthProvider";
import ChatBox from "../../components/ChatBox";
import NoData from "../../components/NoData";
import { getChats } from "../../apis";

const Chat = ({ navigation }) => {
  const { chats, profile, setChats } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const refreshChat = async () => {
    try {
      setIsRefreshing(true);
      response = await getChats(profile._id);
      setChats(response ? response : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      {chats.length <= 0 && (
        <NoData message="Bạn chưa có cuộc hội thoại nào!" />
      )}
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshing={isRefreshing}
        onRefresh={refreshChat}
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
