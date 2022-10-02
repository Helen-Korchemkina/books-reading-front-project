import axios from 'axios';
import { isRejectedWithValue } from '@reduxjs/toolkit';

import { toastErrorNotification } from 'utils/utils';

const axiosInstance = axios.create({
  baseURL: 'https://63318028cff0e7bf70eefa81.mockapi.io',
});

export const axiosBaseQuery =
  () =>
  async ({ url, method, body, params }) => {
    try {
      const result = await axiosInstance({ url, method, data: body, params });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.statusText || axiosError.message,
        },
      };
    }
  };

export const rtkQueryErrorLogger = _ => next => action => {
  if (isRejectedWithValue(action)) {
    const { payload } = action;
    const error = {
      status: payload?.status ? ` Code: ${payload.status}.` : '',
      data: payload?.data ? ` Message: ${JSON.stringify(payload.data)}.` : '',
    };
    const errorMessage = `Server connection error.${error.status}${error.data}`;
    toastErrorNotification.show(errorMessage);
  }

  return next(action);
};
