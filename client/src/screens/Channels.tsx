import React, {useCallback, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, Modal, Text} from '../components';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';

const Channels = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {
    followingChannels,
    trendingChannels,
    allChannels,
    modalChannel,
    setModalChannel,
  } = useData();
  const [channels, setChannels] = useState(allChannels);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const {isDark} = useData();

  const {isAuthenticated} = useSelector((state: any) => state.user);

  const blankAvatar = require('../assets/images/blank-avatar.png');

  const handleChannels = useCallback(
    (tabChannels: number) => {
      setTab(tabChannels);
      setChannels(tabChannels === 0 ? followingChannels : trendingChannels);
    },
    [followingChannels, trendingChannels],
  );

  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block>

      {/* toggle Channel list */}

      {isAuthenticated && (
        <Block
          row
          flex={0}
          align="center"
          justify="center"
          color={colors.card}
          paddingBottom={sizes.sm}>
          <Button onPress={() => handleChannels(0)}>
            <Block row align="center">
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                marginRight={sizes.s}
                width={sizes.socialIconSize}
                height={sizes.socialIconSize}
                gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
                <Image source={assets.extras} color={colors.white} radius={0} />
              </Block>
              <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
                {t('home.following')}
              </Text>
            </Block>
          </Button>
          <Block
            gray
            flex={0}
            width={1}
            marginHorizontal={sizes.sm}
            height={sizes.socialIconSize}
          />
          <Button onPress={() => handleChannels(1)}>
            <Block row align="center">
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                marginRight={sizes.s}
                width={sizes.socialIconSize}
                height={sizes.socialIconSize}
                gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
                <Image
                  radius={0}
                  color={colors.white}
                  source={assets.documentation}
                />
              </Block>
              <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
                {t('home.trending')}
              </Text>
            </Block>
          </Button>
        </Block>
      )}

      {/* Channel list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        {channels?.map((channel, index) => (
          <Block key={index} card marginTop={sizes.sm}>
            <Image
              resizeMode="cover"
              source={channel.banner ? {uri: channel.banner} : assets?.card4}
              style={{width: '100%'}}
            />
            <Text
              p
              marginTop={sizes.s}
              marginLeft={sizes.xs}
              marginBottom={sizes.sm}>
              Description about the channel
            </Text>
            {/* user details */}
            <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
              <Image
                source={
                  channel.channelPicture
                    ? {uri: channel.channelPicture}
                    : blankAvatar
                }
                style={{
                  width: sizes.xl,
                  height: sizes.xl,
                  borderRadius: sizes.s,
                }}
              />
              <Block marginLeft={sizes.s}>
                <Text p semibold>
                  {channel.channelName}
                </Text>
                <Text p gray>
                  Posted on{' '}
                  {new Date(Number(channel.latestPost)).toDateString()}
                </Text>
              </Block>
            </Block>
          </Block>
        ))}
      </Block>
      <Modal
        visible={modalChannel}
        onRequestClose={() => setModalChannel(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={['01', '02']}
          renderItem={({item}) => (
            <Button row justify="flex-start" marginBottom={sizes.s} key={item}>
              <Text p semibold color={isDark ? colors.white : colors.dark}>
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </Block>
  );
};

export default Channels;
