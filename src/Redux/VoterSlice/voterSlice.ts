// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // ✅ Base API URL
// export const BASE_API_URL = import.meta.env.VITE_API_URL;

// // ✅ Payload for creating a voter
// export interface CreateVoterPayload {
//   fullName: string;
//   gender: string;
//   dateOfBirth: string; // ISO string
//   phoneNumber: string;
//   city: string;
//   district: string;
//   address: string;
//   hasVoterId?: boolean;
//   registeredPlace?: string;
//   wantsToChangeRegistration?: boolean;
//   newRegistrationPlace?: string;
//   desiredRegistrationPlace?: string;
//   clanTitle: string;
//   clanSubtitle: string;
// }

// // ✅ Voter structure
// export interface Voter {
//   id: number;
//   fullName: string;
//   gender: string;
//   dateOfBirth: string;
//   phoneNumber: string;
//   city: string;
//   district: string;
//   address: string;
//   hasVoterId: boolean;
//   registeredPlace: string | null;
//   wantsToChangeRegistration: boolean;
//   newRegistrationPlace: string | null;
//   desiredRegistrationPlace: string | null;
//   clanTitle: string;
//   clanSubtitle: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // ✅ API response when creating a voter
// export interface CreateVoterResponse {
//   message: string;
//   voter: Voter;
// }

// // ✅ API response when updating a voter
// export interface UpdateVoterResponse {
//   message: string;
//   voter: Voter;
// }

// // ✅ State
// interface VoterState {
//   loading: boolean;
//   success: boolean;
//   error: string | null;
//   voters: Voter[];
// }

// // ✅ Initial state
// const initialState: VoterState = {
//   loading: false,
//   success: false,
//   error: null,
//   voters: [],
// };

// // ✅ Create voter thunk
// export const createVoter = createAsyncThunk<
//   CreateVoterResponse,
//   CreateVoterPayload,
//   { rejectValue: string }
// >("voter/create", async (payload, thunkAPI) => {
//   try {
//     const res = await axios.post<CreateVoterResponse>(
//       `${BASE_API_URL}/api/voters/create`,
//       payload
//     );
//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(
//         error.response.data?.message || "Failed to create voter"
//       );
//     }
//     return thunkAPI.rejectWithValue("Failed to create voter");
//   }
// });

// // ✅ Fetch all voters
// export const fetchAllVoters = createAsyncThunk<
//   Voter[],
//   void,
//   { rejectValue: string }
// >("voter/fetchAll", async (_, thunkAPI) => {
//   try {
//     const res = await axios.get<Voter[]>(`${BASE_API_URL}/api/voters`);
//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(
//         error.response.data?.message || "Failed to load voters"
//       );
//     }
//     return thunkAPI.rejectWithValue("Failed to load voters");
//   }
// });

// // ✅ Update voter
// export const updateVoter = createAsyncThunk<
//   UpdateVoterResponse,
//   { voterId: number; data: Partial<CreateVoterPayload> },
//   { rejectValue: string }
// >("voter/update", async ({ voterId, data }, thunkAPI) => {
//   try {
//     const res = await axios.put<UpdateVoterResponse>(
//       `${BASE_API_URL}/api/voters/${voterId}`,
//       data
//     );
//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(
//         error.response.data?.message || "Failed to update voter"
//       );
//     }
//     return thunkAPI.rejectWithValue("Failed to update voter");
//   }
// });

// // ✅ Delete voter
// export const deleteVoter = createAsyncThunk<
//   { message: string; id: number },
//   number,
//   { rejectValue: string }
// >("voter/delete", async (voterId, thunkAPI) => {
//   try {
//     const res = await axios.delete<{ message: string }>(
//       `${BASE_API_URL}/api/voters/${voterId}`
//     );
//     return { message: res.data.message, id: voterId };
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(
//         error.response.data?.message || "Failed to delete voter"
//       );
//     }
//     return thunkAPI.rejectWithValue("Failed to delete voter");
//   }
// });

// // ✅ Slice
// export const voterSlice = createSlice({
//   name: "voterSlice",
//   initialState,
//   reducers: {
//     clearVoterState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create voter
//       .addCase(createVoter.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(createVoter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.voters.unshift(action.payload.voter);
//       })
//       .addCase(createVoter.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload || "Failed to create voter";
//       })

//       // Fetch all voters
//       .addCase(fetchAllVoters.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllVoters.fulfilled, (state, action) => {
//         state.loading = false;
//         state.voters = action.payload;
//       })
//       .addCase(fetchAllVoters.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to load voters";
//       })

//       // Update voter
//       .addCase(updateVoter.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(updateVoter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         const index = state.voters.findIndex(
//           (v) => v.id === action.payload.voter.id
//         );
//         if (index !== -1) {
//           state.voters[index] = action.payload.voter;
//         }
//       })
//       .addCase(updateVoter.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload || "Failed to update voter";
//       })

//       // Delete voter
//       .addCase(deleteVoter.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(deleteVoter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.voters = state.voters.filter((v) => v.id !== action.payload.id);
//       })
//       .addCase(deleteVoter.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload || "Failed to delete voter";
//       });
//   },
// });

// // ✅ Exports
// export const { clearVoterState } = voterSlice.actions;
// export default voterSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Base API URL
export const BASE_API_URL = import.meta.env.VITE_API_URL;

// ✅ Payload for creating a voter
export interface CreateVoterPayload {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  city: string;
  district: string;
  address: string;
  hasVoterId?: boolean;
  registeredPlace?: string;
  wantsToChangeRegistration?: boolean;
  newRegistrationPlace?: string;
  desiredRegistrationPlace?: string;
  clanTitle: string;
  clanSubtitle: string;
}

// ✅ Voter structure
export interface Voter {
  id: number;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  city: string;
  district: string;
  address: string;
  hasVoterId: boolean;
  registeredPlace: string | null;
  wantsToChangeRegistration: boolean;
  newRegistrationPlace: string | null;
  desiredRegistrationPlace: string | null;
  clanTitle: string;
  clanSubtitle: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ API response when creating a voter
export interface CreateVoterResponse {
  message: string;
  voter: Voter;
}

// ✅ API response when updating a voter
export interface UpdateVoterResponse {
  message: string;
  voter: Voter;
}

// ✅ State
interface VoterState {
  loading: boolean;
  success: boolean;
  error: string | null;
  voters: Voter[];
}

// ✅ Initial state
const initialState: VoterState = {
  loading: false,
  success: false,
  error: null,
  voters: [],
};

// ✅ Create voter
export const createVoter = createAsyncThunk<
  CreateVoterResponse,
  CreateVoterPayload,
  { rejectValue: string }
>("voter/create", async (payload, thunkAPI) => {
  try {
    const res = await axios.post<CreateVoterResponse>(
      `${BASE_API_URL}/api/voters/create`,
      payload
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to create voter"
      );
    }
    return thunkAPI.rejectWithValue("Failed to create voter");
  }
});

// ✅ Fetch all voters
export const fetchAllVoters = createAsyncThunk<
  Voter[],
  void,
  { rejectValue: string }
>("voter/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get<Voter[]>(`${BASE_API_URL}/api/voters`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to load voters"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load voters");
  }
});

// ✅ Fetch voters by clan
export const fetchVotersByClan = createAsyncThunk<
  Voter[],
  { clanTitle: string; clanSubtitle?: string },
  { rejectValue: string }
>("voter/fetchByClan", async ({ clanTitle, clanSubtitle }, thunkAPI) => {
  try {
    const params = new URLSearchParams();
    params.append("clanTitle", clanTitle);
    if (clanSubtitle) {
      params.append("clanSubtitle", clanSubtitle);
    }

    const res = await axios.get<Voter[]>(
      `${BASE_API_URL}/api/voters/by-clan?${params.toString()}`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to load voters"
      );
    }
    return thunkAPI.rejectWithValue("Failed to load voters");
  }
});

// ✅ Update voter
export const updateVoter = createAsyncThunk<
  UpdateVoterResponse,
  { voterId: number; data: Partial<CreateVoterPayload> },
  { rejectValue: string }
>("voter/update", async ({ voterId, data }, thunkAPI) => {
  try {
    const res = await axios.put<UpdateVoterResponse>(
      `${BASE_API_URL}/api/voters/${voterId}`,
      data
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to update voter"
      );
    }
    return thunkAPI.rejectWithValue("Failed to update voter");
  }
});

// ✅ Delete voter
export const deleteVoter = createAsyncThunk<
  { message: string; id: number },
  number,
  { rejectValue: string }
>("voter/delete", async (voterId, thunkAPI) => {
  try {
    const res = await axios.delete<{ message: string }>(
      `${BASE_API_URL}/api/voters/${voterId}`
    );
    return { message: res.data.message, id: voterId };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.message || "Failed to delete voter"
      );
    }
    return thunkAPI.rejectWithValue("Failed to delete voter");
  }
});

// ✅ Slice
export const voterSlice = createSlice({
  name: "voterSlice",
  initialState,
  reducers: {
    clearVoterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create voter
      .addCase(createVoter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createVoter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.voters.unshift(action.payload.voter);
      })
      .addCase(createVoter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create voter";
      })

      // Fetch all voters
      .addCase(fetchAllVoters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVoters.fulfilled, (state, action) => {
        state.loading = false;
        state.voters = action.payload;
      })
      .addCase(fetchAllVoters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load voters";
      })

      // Fetch voters by clan
      .addCase(fetchVotersByClan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVotersByClan.fulfilled, (state, action) => {
        state.loading = false;
        state.voters = action.payload;
      })
      .addCase(fetchVotersByClan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load voters";
      })

      // Update voter
      .addCase(updateVoter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateVoter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.voters.findIndex(
          (v) => v.id === action.payload.voter.id
        );
        if (index !== -1) {
          state.voters[index] = action.payload.voter;
        }
      })
      .addCase(updateVoter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update voter";
      })

      // Delete voter
      .addCase(deleteVoter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteVoter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.voters = state.voters.filter((v) => v.id !== action.payload.id);
      })
      .addCase(deleteVoter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete voter";
      });
  },
});

// ✅ Exports
export const { clearVoterState } = voterSlice.actions;
export default voterSlice.reducer;
