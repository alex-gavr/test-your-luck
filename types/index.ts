export interface ICardsData {
    id: number;
    name: string;
    img: string;
}

export interface ICardsGame {
    gameStarted: boolean;
    cardFlipped: boolean;
    flippedCardsCount: number;
    probabilityMessage: string;
}