import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../../store";
import useUser from "../../lib/useUser";
import { AnyAction, Dispatch } from "redux";

export interface UserState {
  id: number
  firstName: string
  lastName: string
  country: string
  age: string
  email: string
}

export interface AuthState {
  user?: UserState
}

const initialState: AuthState = {}

// First, create the thunk
export const fetchUserByJwt = createAsyncThunk(
  'users/fetchUserByJwt',
  async (payload) => {
    // const response = await userAPI.fetchById(userId)

    const response = await useUser(payload)


    return response.user
  }
) as any

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  /*  extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },*/
  extraReducers: (builder) => {
    builder.addCase((state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    })


    builder.addCase(fetchUserByJwt.fulfilled, (state, action) => {
      console.log('builder.addCase(fetchUserByJwt.fulfilled')
      // Add user to the state array
      state.user = action.payload
    })
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