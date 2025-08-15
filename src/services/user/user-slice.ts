// src\services\user\user-slice.ts

import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,

  isLoading: false,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})


// export const { userSelector, isAuthCheckedSelector } = userSlice.selectors;
// export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
