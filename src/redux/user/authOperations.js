import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { axiosAuthQuery } from 'redux/services/authUtils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://books-reading-project.herokuapp.com',
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: body => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      query: body => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.query({
      query: () => ({
        url: '/api/auth/logout',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserQuery,
} = authApi;
