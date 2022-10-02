import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { authApi } from './auth/auth-api';
import { rtkQueryErrorLogger } from 'redux/services/utils';
import { booksApi } from 'redux/books/books-api';
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
  [booksApi.reducerPath]: booksApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
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
    rtkQueryErrorLogger,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);
export { store, persistor };
