import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer';
import {channelReducer} from './reducers/channelReducer';

const Store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default Store;
