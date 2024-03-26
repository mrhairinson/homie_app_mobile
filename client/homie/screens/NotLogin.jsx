import { View, Text, Button} from 'react-native'
import React from 'react'

const NotLogin = ({navigation}) => {
  return (
    <View>
      <Text>You are not login</Text>
      <Text>Already have account</Text>
      <Button
      title="Sign In"
      onPress={() =>
        navigation.navigate('Signin')}
      />
      <Text>New user</Text>
      <Button
      title="Sign Up"
      onPress={() =>
        navigation.navigate('Signup')}
      />
    </View>
  )
}

export default NotLogin