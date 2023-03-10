import { AnimatePresence, m } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ICardsData } from '@/types';
import Card from './Card';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import { initGame, initShuffle, stopShuffle } from '@/services/cardsGameSlice';
import { FlexCCC, NextGame, StartGameButton } from '../styles';
import ym from 'react-yandex-metrika';

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
    position: 'relative',
    minHeight: '300px',
}));
const StyledOverflowContainer = styled(m.div)((props) => ({
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem 2rem',
    gap: '1rem',
    backgroundColor: props.theme.colors.overflowContainer,
    backdropFilter: 'blur(3px) saturate(180%)',
    zIndex: 5,
}));

const StyledParagraph = styled.p({
    textAlign: 'center',
    width: '95%',
});

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

const CardsGame = () => {
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
    const [cards, setCards] = useState(cardsData);
    const [shuffledTimes, setShuffledTimes] = useState(0);
    const dispatch = useAppDispatch();
    const { gameStarted, flippedCardsCount, probabilityMessage, shuffling, mistake, gameFinished } = useAppSelector((state) => state.cardsGame);

    const handleStartGame = () => {
        dispatch(initGame());
        ym('reachGoal', 'startCardsGame');
    };
    const handleNextGame = () => {
        ym('reachGoal', 'goToAgeQuestion');
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

    // Flip and Start shuffling
    useEffect(() => {
        if (gameStarted) {
            dispatch(initShuffle());
        }
    }, [gameStarted]);

    // Stop Shuffling
    useEffect(() => {
        if (shuffling && shuffledTimes < 4) {
            const timer = setTimeout(() => {
                handleShuffle();
                setShuffledTimes(shuffledTimes + 1);
                if (shuffledTimes === 3) {
                    dispatch(stopShuffle());
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [cards, shuffling, shuffledTimes]);

    return (
        <AnimatePresence>
            <Wrapper variants={containerAnimation} initial='hidden' animate='visible' exit='exit'>
                <CardsContainer style={shuffling || mistake ? { pointerEvents: 'none' } : {}}>
                    {cards ? (
                        cards.map((card, index) => <Card key={card.id} img={card.img} name={card.name} id={card.id} />)
                    ) : (
                        <div style={{ height: '300px', width: '100vw' }} />
                    )}
                    {!gameStarted && (
                        <StyledOverflowContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                            <h3>Ready?</h3>
                            <StartGameButton type='button' onClick={handleStartGame}>
                                Shuffle Cards
                            </StartGameButton>
                        </StyledOverflowContainer>
                    )}
                    {gameFinished && (
                        <StyledOverflowContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <h3 style={{textAlign: 'center'}}>Impressive luck!</h3>
                            <NextGame href={'/age'} onClick={handleNextGame}>
                                Continue
                            </NextGame>
                        </StyledOverflowContainer>
                    )}
                </CardsContainer>
                <FlexCCC style={{ width: '100%' }}>
                    <StyledParagraph>{shuffling ? 'Cards being shuffled' : flippedCardsCount === 0 && gameStarted ? 'You may begin' : null}</StyledParagraph>
                    {gameStarted && (
                        <StyledParagraph>
                            {flippedCardsCount === 1
                                ? probabilityMessage
                                : flippedCardsCount === 2
                                ? 'Great Start!'
                                : flippedCardsCount === 3
                                ? probabilityMessage
                                : flippedCardsCount === 4
                                ? 'Here goes two!'
                                : flippedCardsCount === 5
                                ? probabilityMessage
                                : flippedCardsCount === 6
                                ? 'OMG that is three in a row'
                                : flippedCardsCount === 7
                                ? probabilityMessage
                                : flippedCardsCount === 8 || flippedCardsCount === 9
                                ? 'Oh, no! Please try again! '
                                : flippedCardsCount === 10 || flippedCardsCount === 11
                                ? 'There we go!'
                                : null}
                        </StyledParagraph>
                    )}
                </FlexCCC>
            </Wrapper>
        </AnimatePresence>
    );
};

export default CardsGame;
