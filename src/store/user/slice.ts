import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {errorTypes} from '@constants';

import {USER, UserStateType} from './types';

const userInitialState: UserStateType = {
  data: null,
  errors: [],
};

export const userSlice = createSlice({
  name: USER,
  initialState: userInitialState,
  reducers: {
    setUserAction: (
      state: UserStateType,
      {payload: user}: PayloadAction<UserStateType['data']>,
    ) => {
      state.data = user;
    },
    clearErrorsAction: (state: UserStateType) => {
      state.errors = [];
    },
    putErrorAction: (
      state: UserStateType,
      {payload: message}: PayloadAction<string>,
    ) => {
      state.errors = [...state.errors, {type: errorTypes.authError, message}];
    },
  },
});

export const {setUserAction, putErrorAction, clearErrorsAction} =
  userSlice.actions;
export const userReducer = userSlice.reducer;
