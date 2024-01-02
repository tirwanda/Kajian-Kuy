import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  userId: '',
  channel: null,
  error: null,
  errorCode: 0,
  response: {
    status: 0,
  },
};

export const channelReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('CHANNEL_REGISTRATION_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('CHANNEL_REGISTRATION_SUCCESS', (state, action: any) => {
      state.loading = false;
      state.channel = action.payload;
      state.userId = action.payload.user._id;
    })
    .addCase('CHANNEL_REGISTRATION_FAILED', (state, action: any) => {
      state.loading = false;
      state.errorCode = action.payload.status;
      state.error = action.payload.data.message;
    });
});
