import { createSlice } from '@reduxjs/toolkit';
let test;
if (typeof window !== 'undefined') {
	const item = localStorage.getItem('positionNav');
	test = item;
}

const layoutSlice = createSlice({
	name: 'layout',
	initialState: test || 'left',
	reducers: {
		layoutState: (state) => {
			if (state == `left`) {
				return 'right';
			} else {
				return 'left';
			}
		},
	},
});

export const { layoutState } = layoutSlice.actions;
export default layoutSlice.reducer;
