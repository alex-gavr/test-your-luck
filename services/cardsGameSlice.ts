import { ICardsGame } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICardsGame = {
    gameStarted: false,
    shuffling: false,
    flippedCardsCount: 0,
    probabilityMessage: '',
    shouldFlipBack: false,
    currentCard: {
        id: 0,
        name: '',
        img: '',
    },
    mistake: false,
    pineapplesShown: false,
};

export const cardsGameSlice = createSlice({
    name: 'cardsGame',
    initialState,
    reducers: {
        initGame(state) {
            state.gameStarted = true;
        },
        initShuffle(state) {
            state.shuffling = true;
        },
        stopShuffle(state) {
            state.shuffling = false;
        },
        flipCard(state) {
            state.flippedCardsCount = state.flippedCardsCount + 1;
        },
        setCurrentCard(state, action) {
            state.currentCard.id = action.payload.id;
            state.currentCard.name = action.payload.name;
            state.currentCard.img = action.payload.img;
        },
        setMistake(state, action) {
            state.mistake = action.payload;
        },
        setPineapplesShown(state, action) {
            state.pineapplesShown = action.payload;
        },
        setProbabilityMessage(state, action) {
            state.probabilityMessage = action.payload;
        },
        flipCardBack(state) {
            state.shouldFlipBack = true;
        },
        resetCardGame(state) {
            state.gameStarted = false;
            state.flippedCardsCount = 0;
            state.probabilityMessage = '';
            state.shouldFlipBack = false;
        },
    },
});

export const { initGame, initShuffle, stopShuffle, flipCard, setCurrentCard, resetCardGame, setProbabilityMessage, flipCardBack, setMistake, setPineapplesShown } =
    cardsGameSlice.actions;
export default cardsGameSlice.reducer;
