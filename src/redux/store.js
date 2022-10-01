import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { rtkQueryErrorLogger } from 'redux/services/utils';
import { booksApi } from 'redux/books/books-api';
import { authApi } from './user/authOperations';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
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
