import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { authToken } from 'redux/services/utils';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLogin: false },

  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      if (token) {
        authToken.set(token);
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    addToken: (state, { payload }) => {
      state.token = payload;
      if (payload) {
        authToken.set(payload);
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
  },
});

export const useAuth = () => {
  const dispatch = useDispatch();
  const credentialsUpdate = loginData => dispatch(setCredentials(loginData));
  return { credentialsUpdate };
};
export const { setCredentials, addToken} = authSlice.actions;
export default authSlice.reducer;
