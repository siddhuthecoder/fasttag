// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice'
import companyReducer from './CompanySlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
  },
});

export default store;
