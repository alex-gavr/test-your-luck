import { configureStore } from "@reduxjs/toolkit";
import cardsGameReducer from './cardsGameSlice';
import mainExitReducer from './mainExitSlice';


export const store = configureStore({
    reducer:{
        cardsGame: cardsGameReducer,
        mainExit: mainExitReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;