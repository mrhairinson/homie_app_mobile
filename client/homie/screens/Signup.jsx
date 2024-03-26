import { View, Text, Button} from 'react-native'
import React from 'react'

const Signup = ({navigation}) => {
  return (
    <View>
      <Text>Already have account</Text>
      <Button
      title="Sign In"
      onPress={() =>
        navigation.navigate('Signin')}
      />
      <Text>Type your phone number</Text>
      <Button
      title="Verify"
      onPress={() =>
        navigation.navigate('Verification')}
      />
    </View>
  )
}

export default Signup