import { IMainExit } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IMainExit = {
    fromMainExit: false,
};

export const mainExitSlice = createSlice({
    name: 'mainExit',
    initialState,
    reducers: {
        initMainExit(state) {
            state.fromMainExit = true;
        },
    },
});

export const { initMainExit } = mainExitSlice.actions;
export default mainExitSlice.reducer;
