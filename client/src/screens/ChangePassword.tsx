import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, MessageModal, Text} from '../components/';
import {Platform} from 'react-native';

import * as regex from '../constants/regex';
import {updatePassword} from '../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';
import {MessageTypes} from '../constants/types';

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
  const dispatch = useDispatch();
  const {sizes, gradients} = useTheme();
  const {error, errorCode, response} = useSelector((state: any) => state.user);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleUpdate = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      updatePassword(
        changePassword.oldPassword,
        changePassword.newPassword,
      )(dispatch);
    }
  }, [isValid, changePassword, dispatch]);

  const handleCloseErrorModal = () => {
    setIsError(false);
    dispatch({type: 'resetError'});
  };

  const handleCloseSuccessModal = () => {
    setIsSuccess(false);
    dispatch({type: 'resetResponseStatus'});
    navigation.navigate('Profile');
  };

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

  useEffect(() => {
    if (errorCode === 400) {
      setIsError(true);
    }
  }, [errorCode]);

  useEffect(() => {
    if (response.status === 201) {
      setIsSuccess(true);
    }
  }, [response]);

  return (
    <Block
      scroll
      padding={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: sizes.xxl}}>
      <MessageModal
        messageModalVisible={isError}
        messageText={error}
        headerText="Failed to Update Password"
        onDismiss={() => handleCloseErrorModal()}
        onReject={() => handleCloseErrorModal()}
        messageType={MessageTypes.FAIL}
      />
      <MessageModal
        messageModalVisible={isSuccess}
        messageText={"You've successfully changed your password"}
        headerText="Success To Change Password"
        onDismiss={() => handleCloseSuccessModal()}
        onReject={() => handleCloseSuccessModal()}
        messageType={MessageTypes.SUCCESS}
      />
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
          onPress={handleUpdate}
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
