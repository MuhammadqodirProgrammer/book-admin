"use client"
import { createSlice } from '@reduxjs/toolkit';


let test ;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const item = localStorage.getItem('navSt')
  test =item
}

const navSlice = createSlice({
  name: 'navSt',
  initialState:test  || true,
  reducers: {
    navState:(state)=> !state,
  },
});

export const { navState } = navSlice.actions;
export default navSlice.reducer;