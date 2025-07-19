import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../api";
import { STATUS } from "../../constants";

export const getPosts = createAsyncThunk("posts/getPosts", async (skip = 0) => {
  const response = await apiClient.get(`/posts?limit=10&skip=${skip}`);
  return response.data;
});

const initialState = {
  items: [],
  skip: 0,
  limit: 10,
  hasMore: true,
  status: STATUS.PENDING,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = STATUS.PENDING;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        if (action.payload.posts.length < state.limit) {
          state.hasMore = false;
        }
        state.items = [...state.items, ...action.payload.posts];
        state.skip += state.limit;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
