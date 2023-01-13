import { configureStore } from "@reduxjs/toolkit";
import cardsGameReducer from './cardsGameSlice'


export const store = configureStore({
    reducer:{
        cardsGame: cardsGameReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;