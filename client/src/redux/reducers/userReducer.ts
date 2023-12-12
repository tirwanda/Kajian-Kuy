import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  error: null,
  errorCode: 0,
  response: {
    status: 0,
  },
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('userRegistrationRequest', (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    })
    .addCase('userRegistrationSuccess', (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('userRegistrationFailed', (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.errorCode = action.payload.status;
      state.error = action.payload.data.message;
    })
    .addCase('userLoadRequest', (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    })
    .addCase('userLoadSuccess', (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('userLoadFailed', (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.payload;
    })
    .addCase('userSignInRequest', (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    })
    .addCase('userSignInSuccess', (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('userSignInFailed', (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.errorCode = action.payload.status;
      state.error = action.payload.data.message;
    })
    .addCase('updateProfileRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateProfileSuccess', (state, action: any) => {
      state.loading = false;
      state.user = action.payload.user;
      state.response.status = action.payload.responseStatus;
    })
    .addCase('updateProfileFailed', (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updateAvatarRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateAvatarSuccess', (state, action: any) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('updateAvatarFailed', (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updatePasswordRequest', (state) => {
      state.loading = true;
      state.response.status = 0;
    })
    .addCase('updatePasswordSuccess', (state, action: any) => {
      state.loading = false;
      state.user = action.payload.user;
      state.response.status = action.payload.responseStatus;
    })
    .addCase('updatePasswordFailed', (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      state.errorCode = action.payload.status;
      state.error = action.payload.data.message;
    })
    .addCase('resetError', (state) => {
      state.error = null;
      state.errorCode = 0;
    })
    .addCase('resetResponseStatus', (state) => {
      state.response.status = 0;
    });
});
