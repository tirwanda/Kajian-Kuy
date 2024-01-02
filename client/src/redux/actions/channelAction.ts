import axios from 'axios';
import URI from '../URI';
import {Dispatch} from 'redux';
import * as SecureStore from 'expo-secure-store';
import {TOKEN} from '../../constants';

export const createChannel =
  (
    userId: string,
    channelName: string,
    description: string,
    country: string,
    city: string,
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'CHANNEL_REGISTRATION_REQUEST',
      });

      const token = await SecureStore.getItemAsync(TOKEN);
      const {data} = await axios.post(
        `${URI}/create-channel`,
        {userId, channelName, description, country, city},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({type: 'CHANNEL_REGISTRATION_SUCCESS', payload: data.channel});
      dispatch({type: 'USER_LOAD_SUCCESS', payload: data.user});
    } catch (error: any) {
      dispatch({
        type: 'CHANNEL_REGISTRATION_FAILED',
        payload: error.response,
      });
    }
  };
