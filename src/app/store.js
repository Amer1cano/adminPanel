import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/adminApi';
// import { authApi } from './services/authApi';
import authReducer from '../features/userSlice.js';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
