import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../services/userApi";


export const usersAdapter = createEntityAdapter({
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getAllUser.matchFulfilled,
      (state, action) => {
        usersAdapter.setAll(state, action.payload.users);
      }
    );
  },
})


export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;