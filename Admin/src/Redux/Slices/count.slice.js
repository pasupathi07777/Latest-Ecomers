import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import { getToken } from "../../utils/tokenFunction";


export const getAllCounts = createAsyncThunk(
  "order/getOurOrder",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = await getToken();
      const g = await axiosInstance.get("/count/dashboard-stats", {
        params: { token },
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  getAllCountsLoading: false,
  count:null,
  cancelOrderLoading: false,
  cancelOrderIds: [],
};

export const countSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllCounts.pending, (state) => {
        state.getAllCountsLoading = true;
      })
      .addCase(getAllCounts.fulfilled, (state, action) => {
        state.getAllCountsLoading = false;
        state.count = action.payload.data;
        console.log("count:", action.payload);
      })
      .addCase(getAllCounts.rejected, (state, action) => {
        state.getAllCountsLoading = false;
        console.error("count Rejected:", action.payload);
      });
  },
});

export const {} = countSlice.actions;
export const orderStates = (state) => state.countReducer;
export default countSlice.reducer;
