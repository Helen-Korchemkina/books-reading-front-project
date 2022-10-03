import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://books-reading-project.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['auth'],
  endpoints: builder => ({
    addNewUser: builder.mutation({
      query: ({ name, email, password, confirm_password }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: { name, email, password, confirm_password },
      }),
      invalidatesTags: ['auth'],
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['auth'],
    }),
    logout: builder.query({
      query: () => ({
        url: `/api/auth/logout`,
        method: 'GET',
      }),
      invalidatesTags: ['auth'],
    }),

    currentUser: builder.mutation({
      query: () => ({
        url: `/api/users/current`,
        method: 'GET',
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useLoginMutation,
  useLazyLogoutQuery,
  useCurrentUserMutation,
} = authApi;
