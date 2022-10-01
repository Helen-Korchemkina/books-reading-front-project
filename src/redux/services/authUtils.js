import axios from 'axios';
import { isRejectedWithValue } from '@reduxjs/toolkit';

import { toastErrorNotification } from 'utils/utils';

axios.defaults.baseURL = 'https://books-reading-project.herokuapp.com';

export const axiosAuthQuery = () => async ({ url, method, body, params }) => {
  try {
    const result = await axios({ url, method, data: body, params });
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

export const rtkQueryError = _ => next => action => {
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
