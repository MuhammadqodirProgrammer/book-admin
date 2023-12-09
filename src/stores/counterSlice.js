"use client"
import { createSlice } from '@reduxjs/toolkit';


let test ;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const item = localStorage.getItem('isOpen')
  test =item
}

const counterSlice = createSlice({
  name: 'isOpenMenu',
  initialState:test  || true,
  reducers: {
    menuState:(state)=> !state,
  },
});

export const { menuState } = counterSlice.actions;
export default counterSlice.reducer;