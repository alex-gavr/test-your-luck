export interface ICardsData {
    id: number;
    name: string;
    img: string;
}

export interface ICardsGame {
    gameStarted: boolean;
    shuffling: boolean;

    flippedCardsCount: number;
    probabilityMessage: string;
    shouldFlipBack: boolean;
    currentCard: {
        id: number;
        name: string;
        img: string;
    },
    mistake: boolean;
    pineapplesShown: boolean;
}