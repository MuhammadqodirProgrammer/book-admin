// "use client";

// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";

// const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

// Store yaratish
const storeTest = configureStore({
	reducer: {
		counter: counterSlice,
	},
});

export default storeTest;
