import { AnimatePresence, m, useAnimationControls } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ICardsData } from '@/types';
import Card from './Card';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import { initGame } from '@/services/cardsGameSlice';
import { NextGame, StartGameButton } from '../styles';

const Wrapper = styled(m.div)((props) => ({
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
}));
const CardsContainer = styled(m.div)((props) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '98%',
    maxWidth: '1000px',
}));

const StyledParagraph = styled.p({
    textAlign: 'center',
    width: '95%',
});

const cardsData: ICardsData[] = [
    {
        id: 1,
        name: 'apple',
        img: '/apple.svg',
    },
    {
        id: 2,
        name: 'strawberry',
        img: '/strawberry.svg',
    },
    {
        id: 3,
        name: 'cherry',
        img: '/cherry.svg',
    },
    {
        id: 4,
        name: 'lemon',
        img: '/lemon.svg',
    },
    {
        id: 5,
        name: 'pineapple',
        img: '/pineapple.svg',
    },
    {
        id: 6,
        name: 'strawberry',
        img: '/strawberry.svg',
    },
    {
        id: 7,
        name: 'lemon',
        img: '/lemon.svg',
    },
    {
        id: 8,
        name: 'apple',
        img: '/apple.svg',
    },
    {
        id: 9,
        name: 'pineapple',
        img: '/pineapple.svg',
    },
    {
        id: 10,
        name: 'cherry',
        img: '/cherry.svg',
    },
];

const containerAnimation = {
    visible: (i = 1) => ({
        opacity: 1,
        transition: {
            duration: 0.3,
            when: 'beforeChildren',
            staggerChildren: 0.3 * i,
            ease: 'easeInOut',
        },
    }),
    hidden: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
        },
    },
};

const initialShowCards = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

const CardsGame = () => {
    const [cards, setCards] = useState(cardsData);
    const [initShuffle, setInitShuffle] = useState(false);
    const [shuffledTimes, setShuffledTimes] = useState(0);
    const controls = useAnimationControls();
    const dispatch = useAppDispatch();
    const { gameStarted, flippedCardsCount } = useAppSelector((state) => state.cardsGame);

    const handleStartGame = () => {
        dispatch(initGame());
    };

    const handleShuffle = () => {
        const shuffled = [];
        while (cards.length > 0) {
            let i = (Math.random() * cards.length) | 0;
            shuffled.push(cards[i]);
            cards.splice(i, 1);
        }
        setCards(shuffled);
    };

    useEffect(() => {
        if (gameStarted) {
            const sequence = async () => {
                await controls.start({
                    rotateY: 180,
                    transition: {
                        rotateY: {
                            duration: 0.5,
                        },
                    },
                });
            };
            sequence();
            setInitShuffle(true);
        }
    }, [gameStarted]);

    useEffect(() => {
        if (initShuffle && shuffledTimes < 3) {
            const timer = setTimeout(() => {
                handleShuffle();
                setShuffledTimes(shuffledTimes + 1);
                if (shuffledTimes === 2) {
                    setInitShuffle(false);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [cards, initShuffle, shuffledTimes]);

    return (
        <AnimatePresence mode='wait'>
            <Wrapper variants={containerAnimation} initial='hidden' animate='visible' exit='exit' layout >
                <CardsContainer style={initShuffle ? { pointerEvents: 'none' } : {}}>
                    {cards.map((card, index) => (
                        <Card key={card.id} img={card.img} name={card.name} id={card.id} animate={controls} />
                    ))}
                </CardsContainer>
                <StyledParagraph>
                    {initShuffle ? 'Cards being shuffled' : flippedCardsCount === 0 && gameStarted ? 'You may begin' : !gameStarted ? 'Ready?' : null}
                </StyledParagraph>
                {gameStarted && (
                    <StyledParagraph>
                        {flippedCardsCount === 2 || flippedCardsCount === 3
                            ? 'Great Start!'
                            : flippedCardsCount === 4 || flippedCardsCount === 5
                            ? 'Here goes two!'
                            : flippedCardsCount === 6 || flippedCardsCount === 7
                            ? 'OMG that is three in a row'
                            : flippedCardsCount === 8 || flippedCardsCount === 9
                            ? 'Incredible! What a winning streak!'
                            : flippedCardsCount === 10
                            ? 'No way you did it first try! WOW, what a luck!'
                            : null}
                    </StyledParagraph>
                )}
                {!gameStarted && (
                    <StartGameButton type='button' onClick={handleStartGame}>
                        Shuffle Cards
                    </StartGameButton>
                )}
                {gameStarted && flippedCardsCount === 10 && <NextGame href={'/age'}>Continue</NextGame>}
            </Wrapper>
        </AnimatePresence>
    );
};

export default CardsGame;
