import { View, Text, Button} from 'react-native'
import React from 'react'

const Signin = ({navigation}) => {
  return (
    <View>
      <Text>Type your phone number</Text>
      <Button
      title="Sign In"
      onPress={() =>
        navigation.navigate('Signup')}
      />
    </View>
  )
}

export default Signin