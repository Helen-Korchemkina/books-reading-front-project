import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLogin: false },

  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      token ? (state.isLogin = true) : (state.isLogin = false);
    },
  },
});

export const useAuth = () => {
  const dispatch = useDispatch();
  const credentialsUpdate = loginData => dispatch(setCredentials(loginData));
  return { credentialsUpdate };
};
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
