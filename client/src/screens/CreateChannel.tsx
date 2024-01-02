import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {
  Block,
  Button,
  Input,
  Image,
  Text,
  Checkbox,
  MessageModal,
} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {createChannel} from '../redux/actions/channelAction';
import {MessageTypes} from '../constants/types';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  channelName: string;
  description: string;
  country: string;
  city: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  channelName: boolean;
  description: boolean;
  country: boolean;
  city: boolean;
  agreed: boolean;
}

const CreateChannel = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {error, errorCode, loading} = useSelector((state: any) => state.user);
  const {user} = useSelector((state: any) => state.user);
  const {channel} = useSelector((state: any) => state.channel);

  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    channelName: false,
    description: false,
    country: false,
    city: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    channelName: '',
    description: '',
    country: '',
    city: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback((value: any) => {
    setRegistration((state) => ({...state, ...value}));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      createChannel(
        user._id,
        registration.channelName,
        registration.description,
        registration.country,
        registration.city,
      )(dispatch);
    }
  }, [registration, isValid, dispatch, user._id]);

  const handleCloseModal = () => {
    setIsError(false);
    dispatch({type: 'resetError'});
  };

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      channelName: regex.channelName.test(registration.channelName),
      description: regex.description.test(registration.description),
      country: regex.country.test(registration.country),
      city: regex.name.test(registration.city),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  useEffect(() => {
    if (errorCode === 400) {
      setIsError(true);
    }
  }, [errorCode]);

  useEffect(() => {
    if (channel.channelname !== null) {
      navigation.navigate('Channels');
    }
  }, [channel, navigation]);

  return (
    <Block safe marginTop={sizes.md}>
      <MessageModal
        messageModalVisible={isError}
        messageText={error}
        headerText="Register Failed"
        onDismiss={() => handleCloseModal()}
        onReject={() => handleCloseModal()}
        messageType={MessageTypes.FAIL}
      />
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
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

            <Text h4 center white marginBottom={sizes.md}>
              {t('channel.register')}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text h5 semibold center>
                {t('channel.appearance')}
              </Text>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}
              />
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('channel.channelName')}
                  placeholder={t('channel.channelNamePlaceholder')}
                  success={Boolean(
                    registration.channelName && isValid.channelName,
                  )}
                  danger={Boolean(
                    registration.channelName && !isValid.channelName,
                  )}
                  onChangeText={(value) => handleChange({channelName: value})}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('channel.description')}
                  placeholder={t('channel.descriptionPlaceHolder')}
                  success={Boolean(
                    registration.description && isValid.description,
                  )}
                  danger={Boolean(
                    registration.description && !isValid.description,
                  )}
                  onChangeText={(value) => handleChange({description: value})}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('channel.country')}
                  placeholder={t('channel.countryPlaceholder')}
                  success={Boolean(registration.country && isValid.country)}
                  danger={Boolean(registration.country && !isValid.country)}
                  onChangeText={(value) => handleChange({country: value})}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('channel.city')}
                  placeholder={t('channel.cityPlaceholder')}
                  success={Boolean(registration.city && isValid.city)}
                  danger={Boolean(registration.city && !isValid.city)}
                  onChangeText={(value) => handleChange({city: value})}
                />
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({agreed: value})}
                />
                <Text paddingRight={sizes.s}>
                  {t('common.agree')}
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL('https://www.creative-tim.com/terms');
                    }}>
                    {t('common.terms')}
                  </Text>
                </Text>
              </Block>
              <Button
                onPress={handleSubmit}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false) || loading}>
                <Text bold white transform="uppercase">
                  {t('channel.submit')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default CreateChannel;
