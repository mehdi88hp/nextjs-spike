import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../../store";

export interface UserState {
  id: number
  name: string
}

export interface AuthState {
  user?: UserState
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  }

})

// export const authSlice = createAsyncThunk(
//   'auth/auth',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );

// Action creators are generated for each case reducer function
// export const {setUser} = authSlice.actions
//
// export default authSlice.reducer

export const {setUser} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.user;

export default authSlice.reducer;