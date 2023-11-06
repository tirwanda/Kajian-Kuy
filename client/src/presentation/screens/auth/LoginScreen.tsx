import {Platform} from 'react-native';
import {useData} from '../../../application/hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '../../../application/hooks';
import * as regex from '../../../application/constants/regex';
import Button from '../../components/button/Button';
import Text from '../../components/text/Text';
import Block from '../../components/block/Block';
import Image from '../../components/image/Image';
import Input from '../../components/input/Input';

type Props = {
  navigation: any;
};

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  email: string;
  password: string;
}

interface IRegistrationValidation {
  email: boolean;
  password: boolean;
}

const LoginScreen = ({navigation}: Props) => {
  const [registration, setRegistration] = useState<IRegistration>({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    email: false,
    password: false,
  });
  const {gradients, sizes, assets, colors} = useTheme();
  const {isDark} = useData();

  const handleChange = useCallback(
    (value: any) => {
      setRegistration(state => ({...state, ...value}));
    },
    [setRegistration],
  );

  useEffect(() => {
    setIsValid(state => ({
      ...state,
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
            <Text bold h4 center white marginBottom={sizes.md}>
              Kajian Kuy
            </Text>
          </Image>
        </Block>

        {/* Login Form */}
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
              <Text p bold center>
                Login With
              </Text>

              {/* Social Button */}
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

              {/* Separator Or */}
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
                  or
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

              {/* Login with email */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Email'}
                  keyboardType="email-address"
                  placeholder={'Enter your email address'}
                  success={Boolean(registration.email && isValid.email)}
                  danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={value => handleChange({email: value})}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Password'}
                  placeholder={'Enter your password'}
                  onChangeText={value => handleChange({password: value})}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
              </Block>

              <Button
                onPress={() => navigation.navigate('Home')}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  {'Sign In'}
                </Text>
              </Button>
              <Button
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('Signup')}>
                <Text bold primary transform="uppercase">
                  {'Sign Up'}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default LoginScreen;
