import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Base API URL
export const BASE_API_URL = import.meta.env.VITE_API_URL;

// ✅ Voter dashboard summary structure
export interface VoterDashboardSummary {
  total: number;
  withVoterId: number;
  withoutVoterId: number;
  changeRequests: number;
  newRegistrations: number;
  wantsToChangeRegistration: number;
}

// ✅ City-District report item (updated)
export interface CityDistrictReportItem {
  city: string | null;
  district: string | null;
  totalVoters: number;
  withVoterId: number;
  withoutVoterId: number;
  wantsToChangeRegistration: number;
}

// ✅ State
interface SummaryState {
  loading: boolean;
  error: string | null;
  summary: VoterDashboardSummary | null;
  cityDistrictReport: CityDistrictReportItem[];
  cityDistrictLoading: boolean;
  cityDistrictError: string | null;
}

// ✅ Initial state
const initialState: SummaryState = {
  loading: false,
  error: null,
  summary: null,
  cityDistrictReport: [],
  cityDistrictLoading: false,
  cityDistrictError: null,
};

// ✅ Thunk to fetch the summary
export const fetchVoterDashboardSummary = createAsyncThunk<
  VoterDashboardSummary,
  void,
  { rejectValue: string }
>("voterSummary/fetchDashboardSummary", async (_, thunkAPI) => {
  try {
    const res = await axios.get<VoterDashboardSummary>(
      `${BASE_API_URL}/api/voters/summary`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to load summary"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load summary");
  }
});

// ✅ Thunk to fetch city-district report
export const fetchCityDistrictReport = createAsyncThunk<
  CityDistrictReportItem[],
  void,
  { rejectValue: string }
>("voterSummary/fetchCityDistrictReport", async (_, thunkAPI) => {
  try {
    const res = await axios.get<CityDistrictReportItem[]>(
      `${BASE_API_URL}/api/voters/city-district`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to load city-district report"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load city-district report");
  }
});

// ✅ Slice
export const voterSummarySlice = createSlice({
  name: "voterSummarySlice",
  initialState,
  reducers: {
    clearSummaryState: (state) => {
      state.loading = false;
      state.error = null;
      state.summary = null;
      state.cityDistrictReport = [];
      state.cityDistrictLoading = false;
      state.cityDistrictError = null;
    },
  },
  extraReducers: (builder) => {
    // Dashboard summary
    builder
      .addCase(fetchVoterDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVoterDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchVoterDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load summary";
      });
    // City-district report
    builder
      .addCase(fetchCityDistrictReport.pending, (state) => {
        state.cityDistrictLoading = true;
        state.cityDistrictError = null;
      })
      .addCase(fetchCityDistrictReport.fulfilled, (state, action) => {
        state.cityDistrictLoading = false;
        state.cityDistrictReport = action.payload;
      })
      .addCase(fetchCityDistrictReport.rejected, (state, action) => {
        state.cityDistrictLoading = false;
        state.cityDistrictError =
          action.payload || "Failed to load city-district report";
      });
  },
});

// ✅ Exports
export const { clearSummaryState } = voterSummarySlice.actions;
export default voterSummarySlice.reducer;
