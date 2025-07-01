// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // ✅ Get base API URL from environment
// export const BASE_API_URL = import.meta.env.VITE_API_URL;

// // 👉 Payload for registration
// export interface RegisterPayload {
//   fullName: string;
//   email: string;
//   password: string;
//   phoneNumber?: string;
//   role?: "ADMIN" | "USER";
// }

// // 👉 Single user structure
// export interface User {
//   id: number;
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // 👉 API response when registering
// export interface RegisterResponse {
//   message: string;
//   user: User;
// }

// // ✅ State
// interface RegisterState {
//   loading: boolean;
//   success: boolean;
//   error: string | null;
//   users: User[];
// }

// // ✅ Initial state
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
//       `${BASE_API_URL}/api/users/register`,
//       payload
//     );
//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(
//         error.response.data?.message || "Registration failed"
//       );
//     }
//     return thunkAPI.rejectWithValue("Registration failed");
//   }
// });

// // ✅ Fetch all users thunk
// export const fetchAllUsers = createAsyncThunk<
//   User[],
//   void,
//   { rejectValue: string }
// >("user/fetchAll", async (_, thunkAPI) => {
//   try {
//     const res = await axios.get<User[]>(`${BASE_API_URL}/api/users/Allusers`);
//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(
//         error.response.data?.message || "Failed to load users"
//       );
//     }
//     return thunkAPI.rejectWithValue("Failed to load users");
//   }
// });

// // ✅ Slice
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
//       // Register user
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

// // ✅ Exports
// export const { clearRegisterState } = userRegisterSlice.actions;
// export default userRegisterSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_API_URL = import.meta.env.VITE_API_URL;

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: "ADMIN" | "USER";
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: User[];
}

const initialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
  users: [],
};

// ✅ Register user
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("user/register", async (payload, thunkAPI) => {
  try {
    const res = await axios.post<RegisterResponse>(
      `${BASE_API_URL}/api/users/register`,
      payload
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Registration failed"
      );
    }
    return thunkAPI.rejectWithValue("Registration failed");
  }
});

// ✅ Fetch all users
export const fetchAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get<User[]>(`${BASE_API_URL}/api/users/Allusers`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to load users"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load users");
  }
});

// ✅ Delete user
export const deleteUser = createAsyncThunk<
  { message: string; id: number },
  number,
  {
    rejectValue: string;
    state: { loginSlice: { data: { Access_token: string | null } } };
  }
>("user/delete", async (userId, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.loginSlice.data.Access_token;

  try {
    const res = await axios.delete<{ message: string }>(
      `${BASE_API_URL}/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { ...res.data, id: userId };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to delete user"
      );
    }
    return thunkAPI.rejectWithValue("Failed to delete user");
  }
});

// ✅ Update user
export interface UpdateUserPayload {
  id: number;
  data: Partial<RegisterPayload>;
}

export const updateUser = createAsyncThunk<
  { message: string; user: User },
  UpdateUserPayload,
  {
    rejectValue: string;
    state: { loginSlice: { data: { Access_token: string | null } } };
  }
>("user/update", async (payload, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.loginSlice.data.Access_token;

  try {
    const res = await axios.put<{ message: string; user: User }>(
      `${BASE_API_URL}/api/users/${payload.id}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to update user"
      );
    }
    return thunkAPI.rejectWithValue("Failed to update user");
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
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((u) =>
          u.id === action.payload.user.id ? action.payload.user : u
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user";
      });
  },
});

export const { clearRegisterState } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
