import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const usersAdapter = createEntityAdapter({
})



export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ limit, skip, select }, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        limit,
        skip,
        ...(select && { select })
      });
      const response = await axios.get(`https://dummyjson.com/users?${params}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload.users);
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);


export default usersSlice.reducer;