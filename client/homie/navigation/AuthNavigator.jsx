import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Signin, Signup, Verification, NotLogin} from '../screens';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='NotLogin'>
      <Stack.Screen 
        name="NotLogin" 
        component={NotLogin} />
      <Stack.Screen 
        name="Signin" 
        component={Signin} />
      <Stack.Screen 
        name="Signup" 
        component={Signup} />
      <Stack.Screen 
        name="Verification" 
        component={Verification} />
    </Stack.Navigator>
  )
}

export default AuthNavigator