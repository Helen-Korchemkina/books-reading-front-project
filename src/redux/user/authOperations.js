import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL = 'https://books-reading-project.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async cridentials => {
  try {
    const { data } = await axios.post('/api/auth/register', cridentials);
    token.set(data.token);

    return data;
  } catch (error) {}
});

const logIn = createAsyncThunk('auth/login', async cridentials => {
  try {
    const { data } = await axios.post('/api/auth/login', cridentials);
    token.set(data.token);

    return data;
  } catch (error) {}
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/api/auth/logout');
    token.unset();
  } catch (error) {}
});

export const authOperations = {
  logIn,
  register,
  logOut,
};
