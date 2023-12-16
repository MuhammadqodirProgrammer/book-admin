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
import navSlice from './navSlice';

// Store yaratish
const storeTest = configureStore({
	reducer: {
		isOpenMenu: counterSlice,
		positionNav: layoutSlice,
		containerSt:countainerSlice,
		navSt:navSlice
	},
});

export default storeTest;
