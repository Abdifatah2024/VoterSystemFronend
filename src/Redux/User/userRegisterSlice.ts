// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface RegisterPayload {
//   fullName: string;
//   email: string;
//   password: string;
//   phoneNumber?: string;
//   role?: "ADMIN" | "USER";
// }

// export interface User {
//   id: number;
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface RegisterResponse {
//   message: string;
//   user: User;
// }

// interface RegisterState {
//   loading: boolean;
//   success: boolean;
//   error: string | null;
//   users: User[]; // ✅ For storing the fetched list
// }

// const initialState: RegisterState = {
//   loading: false,
//   success: false,
//   error: null,
//   users: [],
// };

// // ✅ Register user thunk
// export const registerUser = createAsyncThunk<
//   RegisterResponse,
//   RegisterPayload,
//   { rejectValue: string }
// >("user/register", async (payload, thunkAPI) => {
//   try {
//     const res = await axios.post<RegisterResponse>(
//       "http://localhost:4001/api/users/register",
//       payload
//     );
//     return res.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Registration failed"
//     );
//   }
// });

// // ✅ Fetch all users thunk
// export const fetchAllUsers = createAsyncThunk<
//   User[],
//   void,
//   { rejectValue: string }
// >("user/fetchAll", async (_, thunkAPI) => {
//   try {
//     const res = await axios.get<User[]>(
//       "http://localhost:4001/api/users/Allusers"
//     );
//     return res.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Failed to load users"
//     );
//   }
// });

// export const userRegisterSlice = createSlice({
//   name: "userRegister",
//   initialState,
//   reducers: {
//     clearRegisterState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload || "Registration failed";
//       })

//       // Fetch all users
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to load users";
//       });
//   },
// });

// export const { clearRegisterState } = userRegisterSlice.actions;
// export default userRegisterSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 👉 Payload for registration
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: "ADMIN" | "USER";
}

// 👉 Single user structure
export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// 👉 API response when registering
export interface RegisterResponse {
  message: string;
  user: User;
}

// ✅ State
interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: User[];
}

// ✅ Initial state
const initialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
  users: [],
};

// ✅ Register user thunk
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("user/register", async (payload, thunkAPI) => {
  try {
    const res = await axios.post<RegisterResponse>(
      "http://localhost:4001/api/users/register",
      payload
    );
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

// ✅ Fetch all users thunk
export const fetchAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get<User[]>(
      "http://localhost:4001/api/users/Allusers"
    );
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to load users"
    );
  }
});

// ✅ Slice
export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    clearRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Registration failed";
      })

      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load users";
      });
  },
});

// ✅ Exports
export const { clearRegisterState } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
