import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API
const baseURL = 'https://fastagtracking.com/customulip/company';

// Thunks
export const createCompany = createAsyncThunk(
  'company/create',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL, companyData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  'company/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getCompanyById = createAsyncThunk(
  'company/getById',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/${companyId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompanyById = createAsyncThunk(
  'company/updateById',
  async ({ companyId, companyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/${companyId}`, companyData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompanyById = createAsyncThunk(
    'company/deleteById',
    async (companyId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${baseURL}/${companyId}`);
        return { id: companyId };
      } catch (error) {
        if (error.response) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  );


//   slice

  const companySlice = createSlice({
    name: 'company',
    initialState: {
      companies: [],
      currentCompany: null,
      loading: false,
      error: null,
    },
    reducers: {
      clearCurrentCompany: (state) => {
        state.currentCompany = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createCompany.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createCompany.fulfilled, (state, action) => {
          state.loading = false;
          state.companies.push(action.payload);
        })
        .addCase(createCompany.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getAllCompanies.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllCompanies.fulfilled, (state, action) => {
          state.loading = false;
          state.companies = action.payload;
        })
        .addCase(getAllCompanies.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getCompanyById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getCompanyById.fulfilled, (state, action) => {
          state.loading = false;
          state.currentCompany = action.payload;
        })
        .addCase(getCompanyById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateCompanyById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCompanyById.fulfilled, (state, action) => {
          state.loading = false;
          state.currentCompany = action.payload;
          const index = state.companies.findIndex(company => company.id === action.payload.id);
          if (index !== -1) {
            state.companies[index] = action.payload;
          }
        })
        .addCase(updateCompanyById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(deleteCompanyById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteCompanyById.fulfilled, (state, action) => {
          state.loading = false;
          state.companies = state.companies.filter(company => company.id !== action.payload.id);
        })
        .addCase(deleteCompanyById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

export const { clearCurrentCompany } = companySlice.actions;
export default companySlice.reducer;
