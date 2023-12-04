import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Text} from '../components/';
import {Platform} from 'react-native';

import * as regex from '../constants/regex';

const isAndroid = Platform.OS === 'android';

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface IChangePasswordValidation {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

const ChangePassword = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {sizes, gradients} = useTheme();
  const [isValid, setIsValid] = useState<IChangePasswordValidation>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [changePassword, setChangePassword] = useState<IChangePassword>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = useCallback(
    (value: any) => {
      setChangePassword((state) => ({...state, ...value}));
    },
    [setChangePassword],
  );

  useEffect(() => {
    let isConfirmPasswordValid = false;

    if (changePassword.newPassword === changePassword.confirmPassword) {
      isConfirmPasswordValid = true;
    }

    setIsValid((state) => ({
      ...state,
      oldPassword: regex.password.test(changePassword.oldPassword),
      newPassword: regex.password.test(changePassword.newPassword),
      confirmPassword: isConfirmPasswordValid,
    }));
  }, [changePassword, setIsValid]);

  return (
    <Block
      scroll
      padding={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: sizes.xxl}}>
      {/* settings */}
      <Block card padding={sizes.sm} marginBottom={sizes.sm}>
        <Input
          secureTextEntry
          autoCapitalize="none"
          marginBottom={sizes.m}
          label={t('common.oldPassword')}
          placeholder={t('common.oldPasswordPlaceholder')}
          success={Boolean(changePassword.oldPassword && isValid.oldPassword)}
          danger={Boolean(changePassword.oldPassword && !isValid.oldPassword)}
          onChangeText={(value) => handleChange({oldPassword: value})}
        />
        <Input
          secureTextEntry
          autoCapitalize="none"
          marginBottom={sizes.m}
          label={t('common.newPassword')}
          placeholder={t('common.newPasswordPlaceholder')}
          success={Boolean(changePassword.newPassword && isValid.newPassword)}
          danger={Boolean(changePassword.newPassword && !isValid.newPassword)}
          onChangeText={(value) => handleChange({newPassword: value})}
        />
        <Input
          secureTextEntry
          autoCapitalize="none"
          marginBottom={sizes.m}
          label={t('common.confirmPassword')}
          placeholder={t('common.confirmPasswordPlaceholder')}
          success={Boolean(
            changePassword.confirmPassword && isValid.confirmPassword,
          )}
          danger={Boolean(
            changePassword.confirmPassword && !isValid.confirmPassword,
          )}
          onChangeText={(value) => handleChange({confirmPassword: value})}
        />
        <Button
          // onPress={handleSignUp}
          marginVertical={sizes.s}
          gradient={gradients.primary}
          disabled={Object.values(isValid).includes(false)}>
          <Text bold white transform="uppercase">
            {t('common.update')}
          </Text>
        </Button>
        <Button
          primary
          outlined
          shadow={!isAndroid}
          marginVertical={sizes.s}
          onPress={() => navigation.goBack()}>
          <Text bold primary transform="uppercase">
            {t('common.cancel')}
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default ChangePassword;
