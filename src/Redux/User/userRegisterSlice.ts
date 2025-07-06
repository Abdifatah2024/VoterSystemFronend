import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_API_URL = import.meta.env.VITE_API_URL;

// User registration payload
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: "ADMIN" | "USER";
}

// User model
export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Register response
export interface RegisterResponse {
  message: string;
  user: User;
}

// Voter summary models
export interface VoterSummary {
  id: number;
  fullName: string;
  gender: string;
  city: string;
  district: string;
  createdAt: string;
}

export interface UserVotersSummary {
  userId: number;
  userFullName: string;
  email: string;
  totalVoters: number;
  genderSummary: Record<string, number>;
  citySummary: Record<string, number>;
  districtSummary: Record<string, number>;
  voters: VoterSummary[];
}

export interface VoterCountSummary {
  total: number;
  withVoterId: number;
  withoutVoterId: number;
  changeRequests: number;
  newRegistrations: number;
}

// State
interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: User[];
  usersVotersSummary: UserVotersSummary[];
  voterCountSummary: VoterCountSummary | null;
}

const initialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
  users: [],
  usersVotersSummary: [],
  voterCountSummary: null,
};

// Register user
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
    return thunkAPI.rejectWithValue("Registration failed");
  }
});

// Fetch all users
export const fetchAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get<User[]>(`${BASE_API_URL}/api/users/Allusers`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load users"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load users");
  }
});

// Delete user
export const deleteUser = createAsyncThunk<
  { message: string; id: number },
  number,
  {
    rejectValue: string;
    state: { loginSlice: { data: { Access_token: string | null } } };
  }
>("user/delete", async (userId, thunkAPI) => {
  const token = thunkAPI.getState().loginSlice.data.Access_token;
  try {
    const res = await axios.delete<{ message: string }>(
      `${BASE_API_URL}/api/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { ...res.data, id: userId };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
    return thunkAPI.rejectWithValue("Failed to delete user");
  }
});

// Update user
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
  const token = thunkAPI.getState().loginSlice.data.Access_token;
  try {
    const res = await axios.put<{ message: string; user: User }>(
      `${BASE_API_URL}/api/users/${payload.id}`,
      payload.data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
    return thunkAPI.rejectWithValue("Failed to update user");
  }
});

// Fetch users & voters summary
export const fetchUsersVotersSummary = createAsyncThunk<
  UserVotersSummary[],
  void,
  {
    rejectValue: string;
    state: { loginSlice: { data: { Access_token: string | null } } };
  }
>("user/fetchUsersVotersSummary", async (_, thunkAPI) => {
  const token = thunkAPI.getState().loginSlice.data.Access_token;
  try {
    const res = await axios.get<{ summary: UserVotersSummary[] }>(
      `${BASE_API_URL}/api/voters/UserRegistration/summary`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.summary;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load users summary"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load users summary");
  }
});

// Fetch voter count summary
export const fetchVoterCountSummary = createAsyncThunk<
  VoterCountSummary,
  void,
  { rejectValue: string }
>("user/fetchVoterCountSummary", async (_, thunkAPI) => {
  try {
    const res = await axios.get<VoterCountSummary>(
      `${BASE_API_URL}/api/voters/UserRegistration/summary`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load voter counts"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load voter counts");
  }
});

// Slice
export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    clearRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.usersVotersSummary = [];
      state.voterCountSummary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
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
      })
      // Users voters summary
      .addCase(fetchUsersVotersSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersVotersSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.usersVotersSummary = action.payload;
      })
      .addCase(fetchUsersVotersSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load users summary";
      })
      // Voter count summary
      .addCase(fetchVoterCountSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVoterCountSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.voterCountSummary = action.payload;
      })
      .addCase(fetchVoterCountSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load voter counts";
      });
  },
});

export const { clearRegisterState } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
