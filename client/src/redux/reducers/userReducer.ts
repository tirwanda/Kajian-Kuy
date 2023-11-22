import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  error: null,
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
      state.error = action.payload;
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
    .addCase('userSignInFailed', (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    });
});
