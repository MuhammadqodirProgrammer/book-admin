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
import layoutSlice from './layoutSlice';
import countainerSlice from './containerSlice';

// Store yaratish
const storeTest = configureStore({
	reducer: {
		isOpenMenu: counterSlice,
		positionNav: layoutSlice,
		containerSt:countainerSlice
	},
});

export default storeTest;
