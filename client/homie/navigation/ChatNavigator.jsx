import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Chat from "../screens/chat/Chat";
import Message from "../screens/chat/Message";

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: "Đoạn chat" }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{ title: "Tin nhắn" }}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
