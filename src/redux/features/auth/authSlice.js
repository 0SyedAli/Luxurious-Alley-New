// features/auth/authSlice.js (New File)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

const initialState = {
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Define the async thunk for the Signup API call
export const signUpAdmin = createAsyncThunk(
  'auth/signUpAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // NOTE: Using process.env.NEXT_API_ENDPOINT in Axios instance baseURL is better.
      // If you MUST use it here, ensure it's defined and accessible.
      // Assuming api.js already uses the correct baseURL:
      const response = await api.post('/signUpAdmin', {
        email,
        password,
      });

      // Assuming the API returns user data/token on success
      return response.data;
    } catch (error) {
      console.error('Signup API Error:', error.response?.data || error.message);
      // Return the error message for display
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const signInAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/loginAdmin', {
        email,
        password,
      });

      // Crucial: Handle token/session storage here. 
      // For security, use HTTP-only cookies set by your server.
      // If a token is returned in the body:
      // localStorage.setItem('authToken', response.data.token); 

      return response.data;
    } catch (error) {
      console.error('Login API Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed. Check credentials.');
    }
  }
);
// Define the async thunk for the Create Profile API call
export const createProfile = createAsyncThunk(
  'auth/createProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // The profileData object contains all form fields (firstName, lastName, etc.)
      const response = await api.post('/createProfile', profileData);

      // Assuming success means the profile is created
      return response.data;
    } catch (error) {
      console.error('Create Profile API Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Profile creation failed.');
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Other standard auth reducers (e.g., logout)
  },
  extraReducers: (builder) => {
    // signUpAdmin
    builder
      .addCase(signUpAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Store user data
        state.error = null;
      })
      .addCase(signUpAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // The error message from rejectWithValue
        state.user = null;
      });
    // signInAdmin
    builder
      .addCase(signInAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signInAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Store user data
        state.error = null;
      })
      .addCase(signInAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // The error message
        state.user = null;
      });

    // --- Create Profile Cases ---
    builder
      .addCase(createProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // You might merge the new profile data with the existing user state
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;