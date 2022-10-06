import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { authApi } from './auth/auth-api';
import { booksApi } from './books/books-api';
import { statisticsApi } from './statistics/statistics-api';
import { rtkQueryErrorLogger } from 'redux/services/utils';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [booksApi.reducerPath]: booksApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
  auth: persistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    authApi.middleware,
    booksApi.middleware,
    statisticsApi.middleware,
    rtkQueryErrorLogger,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);
export { store, persistor };
