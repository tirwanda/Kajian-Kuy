import React, {useEffect, useState} from 'react';
import LoginScreen from '../../presentation/screens/auth/LoginScreen';
import SignUpScreen from '../../presentation/screens/auth/SignupScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Auth = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default Auth;
