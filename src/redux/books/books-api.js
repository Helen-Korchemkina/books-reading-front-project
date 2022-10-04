import { createApi } from '@reduxjs/toolkit/query/react';

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
        url: '/book',
        method: 'GET',
      }),
      providesTags: ['Books'],
      transformResponse: response => response.data.books,
    }),
    addBook: builder.mutation({
      query: body => ({
        url: '/book',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Books'],
    }),
    removeBook: builder.mutation({
      query: id => ({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
    updateReviewBook: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/book/${id}/review`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Books'],
    }),
    updateStatusBook: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/book/${id}/status`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useRemoveBookMutation,
  useUpdateReviewBookMutation,
  useUpdateStatusBookMutation,
} = booksApi;
