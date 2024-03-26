import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../contexts/AuthProvider'
import AuthNavigator from '../navigation/AuthNavigator';

const Message = () => {
  const {isLoggedIn} = useAuth();
  return isLoggedIn ? (
    <View>
      <Text> Is on Loggin</Text>
    </View>
  ) : <AuthNavigator/>
}

export default Message