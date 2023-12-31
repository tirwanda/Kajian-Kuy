import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';

import {Block, Button, Image, Input, MessageModal, Text} from '../components';
import {useTheme, useTranslation} from '../hooks';
import {useSelector} from 'react-redux';
import * as regex from '../constants/regex';
import {updateAvatar, updateProfile} from '../redux/actions/userAction';
import {useDispatch} from 'react-redux';
import {checkIfFileExists, deleteAvatar} from '../firebase/firebaseHelper';
import {MessageTypes} from '../constants/types';

const isAndroid = Platform.OS === 'android';

interface IProfileInfo {
  name: string;
  title: string;
  email: string;
  bio: string;
}

interface IProfileInfoValidation {
  name: boolean;
  email: boolean;
}

const EditProfile = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const storage = getStorage();
  const {assets, colors, sizes, gradients} = useTheme();
  const blankAvatar = require('../assets/images/blank-avatar.png');
  const {loading, isAuthenticated, user, response} = useSelector(
    (state: any) => state.user,
  );

  const [selectedImage, setSelectedImage] = useState(user.avatar);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState<string>('0');
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataIsChanged, setDataIsChanged] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<IProfileInfoValidation>({
    name: false,
    email: false,
  });

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
    name: user.name,
    title: user.title || '',
    email: user.email,
    bio: user.bio || '',
  });

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      uploadAvatarImage(result.assets[0].uri);
    }
  };

  async function uploadAvatarImage(uri: string) {
    const res = await fetch(uri);
    const blob = await res.blob();

    const storageRef = ref(storage, 'Avatars/' + user._id);
    checkIfFileExists('Avatars/' + user._id).then((exists) => {
      if (exists) {
        deleteAvatar(user._id);
      }

      const uploadTask = uploadBytesResumable(storageRef, blob);

      // listen for events
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressValue.toFixed());
        },
        (error) => {
          dispatch({
            type: 'updateProfileFailed',
            payload: error.message,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            updateAvatar(downloadURL)(dispatch);
          });
        },
      );
    });
  }

  const handleSubmit = () => {
    if (profileInfo.name === '' || profileInfo.email === '') {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Please fill the all fields and upload avatar',
          ToastAndroid.LONG,
        );
      } else {
        Alert.alert('Please fill the all fields and upload avatar');
      }
    } else {
      updateProfile(
        profileInfo.name,
        profileInfo.title,
        profileInfo.email,
        profileInfo.bio,
      )(dispatch);
    }
  };

  const handleChange = useCallback(
    (value: any) => {
      setProfileInfo((state: any) => ({...state, ...value}));
      setDataIsChanged(false);
    },
    [setProfileInfo],
  );

  const handleCloseSuccessModal = () => {
    setIsSuccess(false);
    dispatch({type: 'resetResponseStatus'});
    navigation.navigate('Profile');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      Alert.alert('You are not logged in');
      navigation.navigate('Home');
    }
  }, [isAuthenticated, navigation, user, selectedImage]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(profileInfo.name),
      email: regex.email.test(profileInfo.email),
    }));
  }, [profileInfo, setIsValid]);

  useEffect(() => {
    if (response.status === 201) {
      setIsSuccess(true);
    }
  }, [response]);

  useEffect(() => {}, [selectedImage]);

  return (
    <Block safe marginTop={sizes.md}>
      <MessageModal
        messageModalVisible={isSuccess}
        headerText="Success To Change User Info"
        onDismiss={() => handleCloseSuccessModal()}
        onReject={() => handleCloseSuccessModal()}
        messageType={MessageTypes.SUCCESS}
      />
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
            <Block flex={0} align="center" marginVertical={sizes.m}>
              <Button onPress={() => handleImageSelection()}>
                <Image
                  width={120}
                  height={120}
                  marginBottom={sizes.sm}
                  source={
                    user.avatar || selectedImage !== null
                      ? {uri: selectedImage}
                      : blankAvatar
                  }
                />
              </Button>
            </Block>
          </Image>

          {/* Form Update */}
          <Block
            keyboard
            behavior={!isAndroid ? 'padding' : 'height'}
            marginTop={-(sizes.height * 0.12 - sizes.l)}>
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
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={t('common.name')}
                    placeholder={t('common.namePlaceholder')}
                    success={Boolean(profileInfo.name && isValid.name)}
                    danger={Boolean(profileInfo.name && !isValid.name)}
                    onChangeText={(value) => handleChange({name: value})}
                    value={profileInfo.name}
                  />
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={t('common.title')}
                    placeholder={t('common.titlePlaceholder')}
                    onChangeText={(value) => handleChange({title: value})}
                    value={profileInfo.title}
                  />
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={t('common.email')}
                    keyboardType="email-address"
                    placeholder={t('common.emailPlaceholder')}
                    disabled
                    onChangeText={(value) => handleChange({email: value})}
                    value={profileInfo.email}
                  />
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={t('profile.bio')}
                    placeholder={t('profile.bioPlaceholder')}
                    multiline
                    onChangeText={(value) => handleChange({bio: value})}
                    value={profileInfo.bio}
                  />
                </Block>

                <Button
                  onPress={handleSubmit}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                  disabled={
                    Object.values(isValid).includes(false) ||
                    loading ||
                    dataIsChanged
                  }>
                  <Text bold white transform="uppercase">
                    {t('common.update')}
                  </Text>
                </Button>
                <Button
                  primary
                  outlined
                  shadow={!isAndroid}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  onPress={() => navigation.navigate('ChangePassword')}>
                  <Text bold primary transform="uppercase">
                    {t('common.changePassword')}
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default EditProfile;
