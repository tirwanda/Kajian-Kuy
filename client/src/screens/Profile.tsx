import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Product, Text} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import {useSelector} from 'react-redux';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const {isAuthenticated, user} = useSelector((state: any) => state.user);
  const {following} = useData();
  const [articles] = useState(following);

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
        // paddingHorizontal={sizes.s}
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
              <Image
                width={120}
                height={120}
                marginBottom={sizes.sm}
                source={user.avatar ? {uri: user.avatar} : blankAvatar}
              />

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
                <Text h5>{user.saveArticles.length}</Text>
                <Text>{t('profile.saveArticle')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{user.subscriptions.length}</Text>
                <Text>{t('profile.subscriptions')}</Text>
              </Block>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.m}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.bio')}
            </Text>
            <Text p lineHeight={26}>
              {user?.bio}
            </Text>
          </Block>

          {/* profile: photo album */}
          <Block marginTop={sizes.s}>
            <Block
              paddingHorizontal={sizes.m}
              row
              align="center"
              justify="space-between">
              <Text h5 semibold>
                {t('profile.saveArticle')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block
              scroll
              paddingHorizontal={sizes.padding}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: sizes.l}}>
              <Block
                row
                wrap="wrap"
                justify="space-between"
                marginTop={sizes.sm}>
                {articles?.map((article, index) => {
                  if (index >= 3) {
                    return;
                  }
                  return <Product {...article} key={`card-${article?.id}`} />;
                })}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
