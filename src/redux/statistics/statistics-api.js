import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'redux/services/utils';

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Statistics'],
  endpoints: builder => ({
    getStatistics: builder.query({
      query: () => ({
        url: '/statistics',
        method: 'GET',
      }),
      providesTags: ['Statistics'],
      transformResponse: response => response.data.statistics,
    }),
    updateStatistics: builder.mutation({
      query: ({ ...patch }) => ({
        url: `/statistics`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Statistics'],
    }),
  }),
});

export const { useGetStatisticsQuery, useUpdateStatisticsMutation } =
  statisticsApi;
