// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_API_URL = import.meta.env.VITE_API_URL;

// // ✅ User change password payload
// interface ChangePasswordPayload {
//   oldPassword: string;
//   newPassword: string;
// }

// // ✅ Admin reset password payload
// interface ResetPasswordPayload {
//   userId: number;
// }

// // ✅ Response types
// interface ChangePasswordResponse {
//   message: string;
// }

// interface ResetPasswordResponse {
//   message: string;
//   newPassword: string;
// }

// // ✅ Slice state
// interface ChangePasswordState {
//   loading: boolean;
//   success: boolean;
//   error: string | null;
//   // For admin resets
//   adminLoading: boolean;
//   adminSuccess: boolean;
//   adminError: string | null;
//   newPassword: string | null;
// }

// const initialState: ChangePasswordState = {
//   loading: false,
//   success: false,
//   error: null,
//   adminLoading: false,
//   adminSuccess: false,
//   adminError: null,
//   newPassword: null,
// };

// // ✅ Thunk: User changes own password
// export const changePassword = createAsyncThunk<
//   ChangePasswordResponse,
//   ChangePasswordPayload,
//   { rejectValue: string }
// >("auth/changePassword", async (payload, thunkAPI) => {
//   try {
//     const token = localStorage.getItem("Access_token");
//     const response = await axios.post<ChangePasswordResponse>(
//       `${BASE_API_URL}/api/users/change-password`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Password change failed"
//     );
//   }
// });

// // ✅ Thunk: Admin resets another user's password
// export const resetUserPassword = createAsyncThunk<
//   ResetPasswordResponse,
//   ResetPasswordPayload,
//   { rejectValue: string }
// >("admin/resetUserPassword", async (payload, thunkAPI) => {
//   try {
//     const token = localStorage.getItem("Access_token");
//     const response = await axios.post<ResetPasswordResponse>(
//       `${BASE_API_URL}/api/users/admin/users/${payload.userId}/reset-password`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Reset password failed"
//     );
//   }
// });

// // ✅ Slice
// const changePasswordSlice = createSlice({
//   name: "changePassword",
//   initialState,
//   reducers: {
//     clearChangePasswordState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//     clearResetPasswordState: (state) => {
//       state.adminLoading = false;
//       state.adminSuccess = false;
//       state.adminError = null;
//       state.newPassword = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // User change password
//     builder
//       .addCase(changePassword.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(changePassword.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(changePassword.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload || "Password change failed";
//       });

//     // Admin reset password
//     builder
//       .addCase(resetUserPassword.pending, (state) => {
//         state.adminLoading = true;
//         state.adminSuccess = false;
//         state.adminError = null;
//         state.newPassword = null;
//       })
//       .addCase(resetUserPassword.fulfilled, (state, action) => {
//         state.adminLoading = false;
//         state.adminSuccess = true;
//         state.adminError = null;
//         state.newPassword = action.payload.newPassword;
//       })
//       .addCase(resetUserPassword.rejected, (state, action) => {
//         state.adminLoading = false;
//         state.adminSuccess = false;
//         state.adminError = action.payload || "Reset password failed";
//         state.newPassword = null;
//       });
//   },
// });

// export const { clearChangePasswordState, clearResetPasswordState } =
//   changePasswordSlice.actions;

// export default changePasswordSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

interface ResetPasswordPayload {
  userId: number;
}

interface ChangePasswordResponse {
  message: string;
}

interface ResetPasswordResponse {
  message: string;
  newPassword: string;
}

interface ChangePasswordState {
  loading: boolean;
  success: boolean;
  error: string | null;
  adminLoading: boolean;
  adminSuccess: boolean;
  adminError: string | null;
  newPassword: string | null;
  message: string | null;
}

const initialState: ChangePasswordState = {
  loading: false,
  success: false,
  error: null,
  adminLoading: false,
  adminSuccess: false,
  adminError: null,
  newPassword: null,
  message: null,
};

// User changes own password
export const changePassword = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordPayload,
  { rejectValue: string }
>("auth/changePassword", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("Access_token");
    const response = await axios.post<ChangePasswordResponse>(
      `${BASE_API_URL}/api/users/change-password`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Password change failed"
    );
  }
});

// Admin resets password
export const resetUserPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordPayload,
  { rejectValue: string }
>("admin/resetUserPassword", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("Access_token");
    const response = await axios.post<ResetPasswordResponse>(
      `${BASE_API_URL}/api/users/admin/users/${payload.userId}/reset-password`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Reset password failed"
    );
  }
});

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    clearChangePasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
    clearResetPasswordState: (state) => {
      state.adminLoading = false;
      state.adminSuccess = false;
      state.adminError = null;
      state.newPassword = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Password change failed";
      })

      .addCase(resetUserPassword.pending, (state) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = null;
        state.newPassword = null;
        state.message = null;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.adminError = null;
        state.newPassword = action.payload.newPassword;
        state.message = action.payload.message;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = action.payload || "Reset password failed";
        state.newPassword = null;
      });
  },
});

export const { clearChangePasswordState, clearResetPasswordState } =
  changePasswordSlice.actions;

export default changePasswordSlice.reducer;
