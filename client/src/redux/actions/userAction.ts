import axios from 'axios';
import URI from '../URI';
import {Dispatch} from 'redux';
import * as SecureStore from 'expo-secure-store';
import {TOKEN, USER} from '../../constants';

export const registerUser =
  (name: string, email: string, password: string, agreed: boolean) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'userRegisterRequest',
      });

      const config = {headers: {'Content-Type': 'application/json'}};
      const {data} = await axios.post(
        `${URI}/registration`,
        {name, email, password, agreed},
        config,
      );

      dispatch({type: 'userRegistrationSuccess', payload: data.user});
      const user = JSON.stringify(data.user);
      await SecureStore.setItemAsync(USER, user);
      await SecureStore.setItemAsync(TOKEN, data.token);
    } catch (error: any) {
      dispatch({
        type: 'userRegistrationFailed',
        payload: error.response,
      });
    }
  };

export const updateProfile =
  (name: string, title: string, email: string, bio: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'updateProfileRequest',
      });

      const token = await SecureStore.getItemAsync(TOKEN);
      const response = await axios.put(
        `${URI}/update-profile`,
        {name, title, email, bio},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({type: 'updateProfileSuccess', payload: response.data});
      const user = JSON.stringify(response.data.user);
      await SecureStore.setItemAsync(USER, user);
    } catch (error: any) {
      dispatch({
        type: 'updateProfileFailed',
        payload: error.response.data.message,
      });
    }
  };

export const updateAvatar =
  (avatar: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'updateAvatarRequest',
      });

      const token = await SecureStore.getItemAsync(TOKEN);
      const {data} = await axios.put(
        `${URI}/update-avatar`,
        {avatar},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({type: 'updateAvatarSuccess', payload: data.user});
      const user = JSON.stringify(data.user);
      await SecureStore.setItemAsync(USER, user);
    } catch (error: any) {
      dispatch({
        type: 'updateAvatarFailed',
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'userLoadRequest',
    });

    const token = await SecureStore.getItemAsync(TOKEN);

    if (token != null) {
      const {data} = await axios.get(`${URI}/me`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      dispatch({
        type: 'userLoadSuccess',
        payload: {
          user: data.user,
          token,
        },
      });
    }
  } catch (error: any) {
    dispatch({
      type: 'userLoadFailed',
      payload: error.response.data.message,
    });
  }
};

export const signInUser =
  (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'userSignInRequest',
      });

      const config = {headers: {'Content-Type': 'application/json'}};

      const {data} = await axios.post(
        `${URI}/signin`,
        {email, password},
        config,
      );
      dispatch({
        type: 'userSignInSuccess',
        payload: data.user,
      });
      if (data.token) {
        await SecureStore.setItemAsync(TOKEN, data.token);
      }
    } catch (error: any) {
      dispatch({
        type: 'userSignInFailed',
        payload: error.response,
      });
    }
  };

export const updatePassword =
  (oldPassword: string, newPassword: string): any =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'updatePasswordRequest',
      });

      const token = await SecureStore.getItemAsync(TOKEN);
      const response = await axios.put(
        `${URI}/change-password`,
        {oldPassword, newPassword},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({type: 'updatePasswordSuccess', payload: response.data});
      const user = JSON.stringify(response.data.user);
      await SecureStore.setItemAsync(USER, user);
      return response.data;
    } catch (error: any) {
      dispatch({
        type: 'updatePasswordFailed',
        payload: error.response,
      });
    }
  };
