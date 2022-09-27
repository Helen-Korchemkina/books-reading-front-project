import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { rtkQueryErrorLogger } from 'redux/services/utils';
import { booksApi } from 'redux/books/books-api';

const rootReducer = combineReducers({
  [booksApi.reducerPath]: booksApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    booksApi.middleware,
    rtkQueryErrorLogger,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});
