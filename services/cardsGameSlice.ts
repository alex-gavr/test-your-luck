import { ICardsGame } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICardsGame = {
    gameStarted: false,
    cardFlipped: false,
    flippedCardsCount: 0,
};

export const cardsGameSlice = createSlice({
    name: 'cardsGame',
    initialState,
    reducers: {
        initGame(state) {
            state.gameStarted = true;
        },
        flipCard(state) {
            state.flippedCardsCount = state.flippedCardsCount + 1;
        },
    },
});

export const { initGame, flipCard } = cardsGameSlice.actions;
export default cardsGameSlice.reducer;
