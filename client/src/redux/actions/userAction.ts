import axios from 'axios';
import URI from '../URI';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      await AsyncStorage.setItem('user', user);
    } catch (error: any) {
      dispatch({
        type: 'userRegistrationFailed',
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'userLoadRequest',
    });
    const {data} = await axios.get(`${URI}/me`);

    dispatch({type: 'userLoadSuccess', payload: data.user});
  } catch (error: any) {
    dispatch({
      type: 'userLoadFailed',
      payload: error.response.data.message,
    });
  }
};
