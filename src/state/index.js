import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  users: [],

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUserz: (state, action) => {
      const updatedUsers = state.users.map((user) => {
        if (user._id === action.payload.user._id) return action.payload.user;
        return user;
      });
      state.users = updatedUsers;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost ,setUsers,setUserz} =
  authSlice.actions;
export default authSlice.reducer;
