import React, {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components';
import {useTheme, useTranslation} from '../hooks';
import {useSelector} from 'react-redux';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const {isAuthenticated, user} = useSelector((state: any) => state.user);

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const blankAvatar = require('../assets/images/blank-avatar.png');

  useEffect(() => {
    if (!isAuthenticated) {
      Alert.alert('You are not logged in');
      navigation.navigate('Home');
    }
  }, [isAuthenticated, navigation]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
            <Block
              row
              flex={0}
              intensity={100}
              overflow="hidden"
              justify="space-between"
              renderToHardwareTextureAndroid>
              <Button
                row
                flex={0}
                justify="flex-start"
                onPress={() => navigation.goBack()}>
                <Image
                  radius={0}
                  width={10}
                  height={18}
                  color={colors.white}
                  source={assets.arrow}
                  transform={[{rotate: '180deg'}]}
                />
                <Text p white marginLeft={sizes.s}>
                  {t('common.goBack')}
                </Text>
              </Button>
              <Button
                row
                flex={0}
                justify="flex-end"
                onPress={() => navigation.navigate('EditProfile')}>
                <Text p white marginLeft={sizes.s}>
                  {t('profile.editProfile')}
                </Text>
              </Button>
            </Block>
            <Block flex={0} align="center" marginVertical={sizes.m}>
              {user.avatar.url !== '' ? (
                <Image
                  width={64}
                  height={64}
                  marginBottom={sizes.sm}
                  source={{uri: user.avatar.url}}
                />
              ) : (
                <Image
                  width={64}
                  height={64}
                  marginBottom={sizes.sm}
                  source={blankAvatar}
                />
              )}

              <Text h5 center white>
                {user?.name}
              </Text>
              <Text p center white>
                {user?.title || ''}
              </Text>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>
                  {user.saveArticles ? user.saveArticles.length : '0'}
                </Text>
                <Text>{t('profile.saveArticle')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{(user?.stats?.following || 0) / 1000}k</Text>
                <Text>{t('profile.subscriptions')}</Text>
              </Block>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.bio')}
            </Text>
            <Text p lineHeight={26}>
              {user?.bio}
            </Text>
          </Block>

          {/* profile: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('profile.saveArticle')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              <Image
                resizeMode="cover"
                source={assets?.photo1}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets?.photo2}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets?.photo3}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
