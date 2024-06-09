import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: [],
    nearbyRequests: [],
  },
  reducers: {
    setPosts: (currentSlice, action) => {
      currentSlice.posts = action.payload;
    },
    addPosts: (currentSlice, action) => {
      currentSlice.posts.push(action.payload);
    },
    nearbyRequests: (currentSlice, action) => {
      currentSlice.nearbyRequests = action.payload;
    },
  },
});
export const postReducer = postSlice.reducer;
export const { setPosts, addPosts, nearbyRequests } = postSlice.actions;
