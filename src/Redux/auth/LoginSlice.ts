import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the login response type
interface LoginResponse {
  Access_token: string;
}

// Define the Redux state shape
interface LoginState {
  data: {
    Access_token: string | null;
  };
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: LoginState = {
  data: {
    Access_token: null,
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ✅ LOGIN action
export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:4001/api/users/login",
      credentials
    );

    const token = response.data.Access_token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token returned from server.");
    }

    // Save token to localStorage
    localStorage.setItem("Access_token", token);

    return { Access_token: token };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

// ✅ CHECK AUTH on app start
export const checkAuth = createAsyncThunk<
  LoginResponse,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, thunkAPI) => {
  const token = localStorage.getItem("Access_token");
  if (!token) {
    return thunkAPI.rejectWithValue("No token found");
  }
  return { Access_token: token };
});

// ✅ LOGOUT action
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("Access_token");
});

// ✅ Slice
export const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data.Access_token = action.payload.Access_token;
        state.isAuthenticated = true; // ✅ set to true on login
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
        state.data.Access_token = null;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.data.Access_token = action.payload.Access_token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.data.Access_token = null;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.data.Access_token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export default loginSlice.reducer;
