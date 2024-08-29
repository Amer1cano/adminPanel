// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('tokenbek') || null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('tokenbek', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('tokenbek');
    },
    checkAuth: (state) => {
      if (state.token && state.token.includes("eyJhbGciOiJIUz")) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
  },
});
export const { setAuth } = authSlice.actions;

export const { loginSuccess, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
