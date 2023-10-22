import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (currentSlice, action) => {
      currentSlice.posts = action.payload;
    },
    addPosts: (currentSlice, action) => {
      currentSlice.posts.push(action.payload);
    },
  },
});
export const postReducer = postSlice.reducer;
export const { setPosts, addPosts } = postSlice.actions;
