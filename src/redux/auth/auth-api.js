import { createApi } from '@reduxjs/toolkit/query/react';

import { getToken } from 'redux/auth/authSelectors';
import { authToken } from 'redux/services/utils';
import { axiosBaseQuery } from 'redux/services/utils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['auth'],
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
    logout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
    }),

    currentUser: builder.query({
      query: () => ({
        url: `/users/current`,
        method: 'GET',
      }),
      providesTags: ['auth'],
      async onQueryStarted(_, { getState }) {
        const token = getToken(getState());

        if (token) {
          authToken.set(token);
        }
      },
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
} = authApi;
