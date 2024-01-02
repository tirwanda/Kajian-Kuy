import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {useTranslation} from './useTranslation';

import Image from '../components/Image';
import Text from '../components/Text';
import useTheme from './useTheme';
import Button from '../components/Button';
import Block from '../components/Block';
import {useSelector} from 'react-redux';
// import {useData} from './useData';

export default () => {
  const {t} = useTranslation();
  const {user} = useSelector((state: any) => state.user);
  const {channel} = useSelector((state: any) => state.channel);
  const navigation = useNavigation();
  const {icons, colors, gradients, sizes} = useTheme();
  // const {setModalChannel} = useData();

  const blankAvatar = require('../assets/images/blank-avatar.png');

  const menu = {
    headerStyle: {elevation: 0},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {marginLeft: -sizes.sm},
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}: StackHeaderTitleProps) => (
      <Text p>{children}</Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{marginRight: sizes.sm}}
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Notifications',
            })
          }>
          <Image source={icons.bell} radius={0} color={colors.icon} />
          <Block
            flex={0}
            right={0}
            width={sizes.s}
            height={sizes.s}
            radius={sizes.xs}
            position="absolute"
            gradient={gradients?.primary}
          />
        </TouchableOpacity>
      </Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => (
        <Text p white>
          {t('navigation.components')}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    pro: {
      ...menu,
      headerTransparent: true,
      headerTitle: () => (
        <Text p white semibold>
          {t('pro.title')}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    notifications: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Home',
            })
          }>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
    },

    channels: {
      ...menu,
      headerRight: () => null,
    },
    channelsAuth: {
      ...menu,
      headerRight: () => (
        <Block row flex={0} align="center" marginRight={sizes.padding}>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                DrawerActions.jumpTo('Screens', {screen: 'Profile'}),
              )
            }>
            {user?.channel !== null ? (
              <Button row flex={0} justify="flex-end">
                <Image
                  width={40}
                  height={40}
                  source={
                    channel.channelPicture
                      ? {uri: channel.channelPicture}
                      : blankAvatar
                  }
                />
              </Button>
            ) : (
              <Button
                row
                flex={0}
                justify="flex-end"
                onPress={() =>
                  navigation.navigate('Screens', {
                    screen: 'CreateChannel',
                  })
                }>
                <MaterialCommunityIcons
                  name={'plus-box-multiple-outline'}
                  size={32}
                  color={colors.primary}
                />
              </Button>
            )}
          </TouchableOpacity>
        </Block>
      ),
    },
  };

  return options;
};
