// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ✅ Import base API URL from environment
// const BASE_API_URL = import.meta.env.VITE_API_URL;

// // Define the login response type
// interface LoginResponse {
//   Access_token: string;
// }

// // Define the Redux state shape
// interface LoginState {
//   data: {
//     Access_token: string | null;
//   };
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: LoginState = {
//   data: {
//     Access_token: null,
//   },
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // ✅ LOGIN action
// export const login = createAsyncThunk<
//   LoginResponse,
//   { email: string; password: string },
//   { rejectValue: string }
// >("auth/login", async (credentials, thunkAPI) => {
//   try {
//     const response = await axios.post<LoginResponse>(
//       `${BASE_API_URL}/api/users/login`,
//       credentials,
//       {
//         withCredentials: true, // only if you rely on cookies
//       }
//     );

//     const token = response.data.Access_token;

//     if (!token) {
//       return thunkAPI.rejectWithValue("No token returned from server.");
//     }

//     // Save token to localStorage
//     localStorage.setItem("Access_token", token);

//     return { Access_token: token };
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Login failed"
//     );
//   }
// });

// // ✅ CHECK AUTH on app start
// export const checkAuth = createAsyncThunk<
//   LoginResponse,
//   void,
//   { rejectValue: string }
// >("auth/checkAuth", async (_, thunkAPI) => {
//   const token = localStorage.getItem("Access_token");
//   if (!token) {
//     return thunkAPI.rejectWithValue("No token found");
//   }
//   return { Access_token: token };
// });

// // ✅ LOGOUT action
// export const logout = createAsyncThunk("auth/logout", async () => {
//   localStorage.removeItem("Access_token");
// });

// // ✅ Slice
// export const loginSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // LOGIN
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.data.Access_token = action.payload.Access_token;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Login failed";
//         state.isAuthenticated = false;
//         state.data.Access_token = null;
//       })

//       // CHECK AUTH
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.data.Access_token = action.payload.Access_token;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.isAuthenticated = false;
//         state.loading = false;
//         state.data.Access_token = null;
//       })

//       // LOGOUT
//       .addCase(logout.fulfilled, (state) => {
//         state.data.Access_token = null;
//         state.isAuthenticated = false;
//         state.loading = false;
//         state.error = null;
//       });
//   },
// });

// export default loginSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
}

interface LoginResponse {
  Access_token: string;
  user: User;
  requirePasswordChange?: boolean;
}

interface LoginState {
  data: {
    Access_token: string | null;
  };
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  requirePasswordChange: boolean;
}

const initialState: LoginState = {
  data: {
    Access_token: null,
  },
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  requirePasswordChange: false,
};

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/users/login`,
      credentials,
      { withCredentials: true }
    );

    const { Access_token, user, requirePasswordChange } = response.data;

    if (!Access_token) {
      return thunkAPI.rejectWithValue("No token returned from server.");
    }

    localStorage.setItem("Access_token", Access_token);

    return { Access_token, user, requirePasswordChange };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed"
    );
  }
});

export const checkAuth = createAsyncThunk<
  LoginResponse,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, thunkAPI) => {
  const token = localStorage.getItem("Access_token");
  if (!token) {
    return thunkAPI.rejectWithValue("No token found");
  }

  // You may fetch profile data in production
  return {
    Access_token: token,
    user: {
      id: 0,
      fullName: "",
      email: "",
      role: "USER",
    },
  };
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("Access_token");
});

export const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.requirePasswordChange = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data.Access_token = action.payload.Access_token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.requirePasswordChange = !!action.payload.requirePasswordChange;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.data.Access_token = null;
        state.user = null;
        state.requirePasswordChange = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Login failed";
      })

      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.data.Access_token = action.payload.Access_token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.data.Access_token = null;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.data.Access_token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.user = null;
        state.requirePasswordChange = false;
      });
  },
});

export default loginSlice.reducer;
