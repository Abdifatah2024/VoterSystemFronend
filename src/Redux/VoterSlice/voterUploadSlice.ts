import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { Voter } from "../../types/Voter";

export const BASE_API_URL = import.meta.env.VITE_API_URL;

// --- Axios Instance with Token ---
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const userData = localStorage.getItem("userData");
  const token = userData ? JSON.parse(userData)?.Access_token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Slice State Interface ---
export interface VoterUploadState {
  createdVoters: Voter[];
  loading: boolean;
  success: boolean;
  error: string | null;
  skipped: { row: number; reason: string }[];
}

// --- Initial State ---
const initialState: VoterUploadState = {
  createdVoters: [],
  loading: false,
  success: false,
  error: null,
  skipped: [],
};

// --- Thunk for Uploading Voter Excel ---
export const uploadVotersExcel = createAsyncThunk<
  {
    created: Voter[];
    skippedDetails: { row: number; reason: string }[];
  },
  FormData,
  { rejectValue: string }
>("api/voters/bulk", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      "/api/voters/upload-excel",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
    return rejectWithValue("An unexpected error occurred.");
  }
});

// --- Slice ---
const voterUploadSlice = createSlice({
  name: "voterUpload",
  initialState,
  reducers: {
    clearVoterUploadState: (state) => {
      state.createdVoters = [];
      state.success = false;
      state.error = null;
      state.skipped = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVotersExcel.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.skipped = [];
      })
      .addCase(uploadVotersExcel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdVoters = action.payload?.created || [];
        state.skipped = action.payload?.skippedDetails || [];
      })
      .addCase(uploadVotersExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Upload failed";
      });
  },
});

// --- Exports ---
export const { clearVoterUploadState } = voterUploadSlice.actions;
export default voterUploadSlice.reducer;
