import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'redux/services/utils';

export const BOOKS_STATUS = {
  pending: 'Going to read',
  reading: 'Reading now',
  finish: 'Already read',
};

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Books'],
  endpoints: builder => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books',
        method: 'GET',
      }),
      providesTags: ['Books'],
    }),
    getBook: builder.query({
      query: id => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
      providesTags: ['Books'],
    }),
    addBook: builder.mutation({
      query: body => ({
        url: '/books',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Books'],
    }),
    removeBook: builder.mutation({
      query: id => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
    updateStatusBook: builder.mutation({
      query: id => ({
        url: `/books/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useRemoveBookMutation,
  useUpdateStatusBookMutation,
} = booksApi;
