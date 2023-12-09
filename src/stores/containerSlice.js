"use client"
import { createSlice } from '@reduxjs/toolkit';


let test ;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const item = localStorage.getItem('my_container')
  test =item
}

const countainerSlice = createSlice({
  name: 'my_container',
  initialState:test  || true,
  reducers: {
    containerState:(state)=> !state,
  },
});

export const { containerState } = countainerSlice.actions;
export default countainerSlice.reducer;