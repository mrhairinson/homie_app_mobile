import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { AuthProvider } from './contexts/AuthProvider';
import React from 'react';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
