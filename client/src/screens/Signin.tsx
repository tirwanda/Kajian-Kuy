import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useData, useTheme, useTranslation} from '../hooks';
import {
  Block,
  Button,
  Checkbox,
  Image,
  Input,
  MessageModal,
  Text,
} from '../components';
import {Platform} from 'react-native';

import * as regex from '../constants/regex';
import {signInUser} from '../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';
import {MessageTypes} from '../constants/types';

const isAndroid = Platform.OS === 'android';

interface ILogin {
  email: string;
  password: string;
  agreed: boolean;
}

interface ILoginValidation {
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Signin = () => {
  const {isDark} = useData();
  const dispatch = useDispatch();
  const {error, isAuthenticated, errorCode, loading} = useSelector(
    (state: any) => state.user,
  );
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {assets, colors, gradients, sizes} = useTheme();

  const [isError, setIsError] = useState(false);

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
    agreed: false,
  });

  const [login, setLoginData] = useState<ILogin>({
    email: '',
    password: '',
    agreed: false,
  });

  const handleChange = useCallback(
    (value: any) => {
      setLoginData((state) => ({...state, ...value}));
    },
    [setLoginData],
  );

  const handleSignIn = useCallback(() => {
    /** send/save registratin data */
    signInUser(login.email, login.password)(dispatch);
  }, [dispatch, login]);

  const handleCloseModal = () => {
    setIsError(false);
    dispatch({type: 'resetError'});
  };

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(login.email),
      password: regex.password.test(login.password),
      agreed: login.agreed,
    }));
  }, [login, setIsValid]);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (errorCode === 401) {
      setIsError(true);
    }
  }, [errorCode]);

  return (
    <Block safe marginTop={sizes.md}>
      <MessageModal
        messageModalVisible={isError}
        messageText={error}
        headerText="Signin Failed"
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
              {t('login.title')}
            </Text>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          marginTop={-(sizes.height * 0.2 - sizes.l)}
          behavior={!isAndroid ? 'padding' : 'height'}>
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
              <Text p semibold center>
                {t('login.subtitle')}
              </Text>
              {/* social buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.facebook}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.apple}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.google}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
              </Block>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Text center marginHorizontal={sizes.s}>
                  {t('common.or')}
                </Text>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  label={t('common.email')}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  success={Boolean(login.email && isValid.email)}
                  danger={Boolean(login.email && !isValid.email)}
                  onChangeText={(value) => handleChange({email: value})}
                />
                <Input
                  secureTextEntry
                  label={t('common.password')}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({password: value})}
                  success={Boolean(login.password && isValid.password)}
                  danger={Boolean(login.password && !isValid.password)}
                />
              </Block>
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={login?.agreed}
                  onPress={(value) => handleChange({agreed: value})}
                />
                <Text paddingRight={sizes.s}>
                  {t('common.agree')}
                  <Text semibold>{t('common.terms')}</Text>
                </Text>
              </Block>
              <Button
                onPress={handleSignIn}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false) || loading}>
                <Text bold white transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Signin;
