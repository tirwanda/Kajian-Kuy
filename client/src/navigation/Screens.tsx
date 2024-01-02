import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home,
  Profile,
  EditProfile,
  Register,
  Signin,
  Settings,
  NotificationsSettings,
  Notifications,
  ChangePassword,
  Channels,
  CreateChannel,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const {user, isAuthenticated} = useSelector((state: any) => state.user);

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      {(user?.role === 'ROLE_USER' ||
        !isAuthenticated ||
        user?.role === 'ROLE_ADMIN') && (
        <Stack.Screen
          name="Channels"
          component={Channels}
          options={screenOptions.channels}
        />
      )}

      {(user?.role === 'ROLE_PUBLISHER' || user?.role === 'ROLE_USTADZ') && (
        <Stack.Screen
          name="Channels"
          component={Channels}
          options={screenOptions.channelsAuth}
        />
      )}

      <Stack.Screen
        name="CreateChannel"
        component={CreateChannel}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: t('common.changePassword')}}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{title: t('navigation.settings')}}
      />

      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={screenOptions.notifications}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
