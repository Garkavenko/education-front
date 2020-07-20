import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {},
  reducers: {
    saveUser: (state, action) => action.payload,
  },
});

export const {
  saveUser,
} = userSlice.actions;

export default userSlice.reducer;
