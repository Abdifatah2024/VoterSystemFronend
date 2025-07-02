import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const BASE_API_URL = import.meta.env.VITE_API_URL;

// ✅ API response type
export interface DemographicsSummary {
  totalVoters: number;
  genderCounts: {
    male: number;
    female: number;
  };
  ageGroups: {
    "18-25": number;
    "26-35": number;
    "36-50": number;
    "51+": number;
  };
  cityDistrict: {
    city: string;
    district: string;
    count: number;
  }[];
  clans: {
    clanTitle: string;
    clanSubtitle: string;
    count: number;
  }[];
  voterIdStatus: {
    withVoterId: number;
    withoutVoterId: number;
  };
  votersPerCity: {
    city: string;
    count: number;
  }[];
}

// ✅ Async thunk
export const fetchDemographicsSummary = createAsyncThunk<
  DemographicsSummary,
  void,
  { rejectValue: string }
>("demographics/fetchSummary", async (_, thunkAPI) => {
  try {
    const res = await axios.get<DemographicsSummary>(
      `${BASE_API_URL}/api/voters/demographics/summary`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to load demographics"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load demographics");
  }
});

// ✅ State
interface DemographicsState {
  loading: boolean;
  error: string | null;
  data: DemographicsSummary | null;
}

// ✅ Initial state
const initialState: DemographicsState = {
  loading: false,
  error: null,
  data: null,
};

// ✅ Slice
export const demographicsSlice = createSlice({
  name: "demographicsSlice",
  initialState,
  reducers: {
    clearDemographicsState: (state) => {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemographicsSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDemographicsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDemographicsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load demographics";
      });
  },
});

// ✅ Exports
export const { clearDemographicsState } = demographicsSlice.actions;
export default demographicsSlice.reducer;
