import { createApi } from '@reduxjs/toolkit/query/react';

import { booksApi } from 'redux/books/books-api';
import { statisticsApi } from 'redux/statistics/statistics-api';
import { getToken } from 'redux/auth/authSelectors';
import { authToken } from 'redux/services/utils';
import { axiosBaseQuery } from 'redux/services/utils';

const setCredentials = async (_, { getState }) => {
  const token = getToken(getState());

  if (token) {
    authToken.set(token);
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['auth', 'training'],
  endpoints: builder => ({
    addNewUser: builder.mutation({
      query: ({ name, email, password, confirm_password }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { name, email, password, confirm_password },
      }),
      invalidatesTags: ['auth'],
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['auth'],
    }),
    logout: builder.query({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
      invalidatesTags: ['auth'],
      async onQueryStarted(_, { dispatch }) {
        dispatch(booksApi.util.resetApiState());
        dispatch(statisticsApi.util.resetApiState());
        dispatch(authApi.util.resetApiState());
      },
    }),
    currentUser: builder.query({
      query: () => ({
        url: '/users/current',
        method: 'GET',
      }),
      providesTags: ['auth'],
      onQueryStarted: setCredentials,
    }),
    getUserTraining: builder.query({
      query: () => ({
        url: '/users/training',
        method: 'GET',
      }),
      providesTags: ['training'],
      onQueryStarted: setCredentials,
    }),
    updateUserTraining: builder.mutation({
      query: body => ({
        url: '/users/training',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['training'],
      onQueryStarted: setCredentials,
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useLoginMutation,
  useLazyLogoutQuery,
  useCurrentUserQuery,
  useGetUserTrainingQuery,
  useUpdateUserTrainingMutation,
} = authApi;
