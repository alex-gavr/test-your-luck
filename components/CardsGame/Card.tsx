import styled from 'styled-components';
import { AnimationControls, m, TargetAndTransition, useAnimationControls, VariantLabels, Variants } from 'framer-motion';
import Image from 'next/image';
import { ICardsData } from '@/types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import { finishGame, flipCard, setCurrentCard, setMistake, setPineapplesShown, setProbabilityMessage } from '@/services/cardsGameSlice';

const StyledCard = styled(m.div)((props) => ({
    width: `clamp(4.375rem, 3.1250rem + 6.6667vw, 9.375rem)`,
    height: `clamp(4.375rem, 3.1250rem + 6.6667vw, 9.375rem)`,
    boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    borderRadius: '1rem',
    backgroundColor: props.theme.colors.primaryDark,
    padding: '0',
    '& > img': {
        width: '100%',
        height: '40%',
    },
    '& > p': {
        fontSize: `clamp(0.5rem, 0.3750rem + 0.6667vw, 1rem)`,
        color: 'black',
    },
    '@media only screen and (max-width: 500px)': {
        '& > img': {
            width: '2em',
            height: '2em',
        },
    },
}));


interface IProps extends ICardsData {
    variants?: Variants;
    animate?: boolean | TargetAndTransition | AnimationControls | VariantLabels | undefined;
}
const Card = ({ img, name, id }: IProps) => {
    const dispatch = useAppDispatch();
    const { flippedCardsCount, gameStarted, currentCard, pineapplesShown } = useAppSelector((state) => state.cardsGame);
    const [isFlipped, setIsFlipped] = useState(false);
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [firstMistakeCard, setFirstMistakeCard] = useState({
        id: 0,
        name: '',
    });
    const [secondMistakeCard, setSecondMistakeCard] = useState({
        id: 0,
        name: '',
    });

    useEffect(() => {
        if ((firstMistakeCard.id && flippedCardsCount === 8) || (secondMistakeCard.id && flippedCardsCount === 8)) {
            const timer = setTimeout(() => {
                setIsFlipped(false);
                dispatch(setMistake(false));
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [firstMistakeCard, secondMistakeCard, flippedCardsCount]);

    const handleFlip = (id: number) => {
        if (isFlipped || !gameStarted) {
            return;
        } else {
            dispatch(flipCard());
            setIsFlipped(!isFlipped);
            if (flippedCardsCount === 0) {
                setImage('./apple.svg');
                setText('apple');
                dispatch(setProbabilityMessage('Pair chance: 11,1%'));
            } else if (flippedCardsCount === 1) {
                setImage('./apple.svg');
                setText('apple');
                dispatch(setProbabilityMessage(''));
            } else if (flippedCardsCount === 2) {
                setImage('./cherry.svg');
                setText('cherry');
                dispatch(setProbabilityMessage('Pair chance again: 1,5%'));
            } else if (flippedCardsCount === 3) {
                setImage('./cherry.svg');
                setText('cherry');
                dispatch(setProbabilityMessage(''));
            } else if (flippedCardsCount === 4) {
                setImage('./strawberry.svg');
                setText('strawberry');
                dispatch(setProbabilityMessage('Pair chance again: 0,31%'));
            } else if (flippedCardsCount === 5) {
                setImage('./strawberry.svg');
                setText('strawberry');
                dispatch(setProbabilityMessage(''));
            } else if (flippedCardsCount === 6) {
                // Remember the Card 1 PINEAPPLE
                setFirstMistakeCard({
                    id: id,
                    name: 'pineapple',
                });
                setImage('./pineapple.svg');
                setText('pineapple');
                dispatch(setProbabilityMessage('Pair chance again: 0,1%'));
            } else if (flippedCardsCount === 7) {
                dispatch(setMistake(true));
                dispatch(setProbabilityMessage(''));
                // Remember the Card 2 LEMON
                setSecondMistakeCard({
                    id: id,
                    name: 'lemon',
                });
                setImage('./lemon.svg');
                setText('lemon');
            } else if (flippedCardsCount === 8) {
                if (id === firstMistakeCard.id) {
                    setImage('./pineapple.svg');
                    setText('pineapple');
                    dispatch(
                        setCurrentCard({
                            id: id,
                            name: 'pineapple',
                            img: './pineapple.svg',
                        })
                    );
                } else if (id === secondMistakeCard.id) {
                    setImage('./lemon.svg');
                    setText('lemon');
                    dispatch(
                        setCurrentCard({
                            id: id,
                            name: 'lemon',
                            img: './lemon.svg',
                        })
                    );
                } else {
                    setImage('./pineapple.svg');
                    setText('pineapple');
                    dispatch(
                        setCurrentCard({
                            id: id,
                            name: 'pineapple',
                            img: './pineapple.svg',
                        })
                    );
                }
            } else if (flippedCardsCount === 9) {
                if (currentCard.name === 'pineapple') {
                    setImage('./pineapple.svg');
                    setText('pineapple');
                    dispatch(setPineapplesShown(true));
                } else {
                    if (id === firstMistakeCard.id) {
                        setImage('./pineapple.svg');
                        setText('pineapple');
                        dispatch(
                            setCurrentCard({
                                id: id,
                                name: 'pineapple',
                                img: './pineapple.svg',
                            })
                        );
                    } else if (id === secondMistakeCard.id) {
                        setImage('./lemon.svg');
                        setText('lemon');
                        dispatch(
                            setCurrentCard({
                                id: id,
                                name: 'lemon',
                                img: './lemon.svg',
                            })
                        );
                    } else {
                        if (currentCard.name === 'lemon') {
                            setImage('./lemon.svg');
                            setText('lemon');
                        } else {
                            setImage('./pineapple.svg');
                            setText('pineapple');
                            dispatch(setPineapplesShown(true));
                        }
                    }
                }
            } else if (flippedCardsCount === 10) {
                if (pineapplesShown) {
                    setImage('./lemon.svg');
                    setText('lemon');
                } else {
                    if (id === firstMistakeCard.id) {
                        setImage('./pineapple.svg');
                        setText('pineapple');
                        dispatch(
                            setCurrentCard({
                                id: id,
                                name: 'pineapple',
                                img: './pineapple.svg',
                            })
                        );
                    } else if (id === secondMistakeCard.id) {
                        setImage('./lemon.svg');
                        setText('lemon');
                        dispatch(
                            setCurrentCard({
                                id: id,
                                name: 'lemon',
                                img: './lemon.svg',
                            })
                        );
                    } else {
                        if (currentCard.name === 'pineapple') {
                            setImage('./lemon.svg');
                            setText('lemon');
                        } else {
                            setImage('./pineapple.svg');
                            setText('pineapple');
                        }
                    }
                }
            } else if (flippedCardsCount === 11) {
                if (pineapplesShown) {
                    setImage('./lemon.svg');
                    setText('lemon');
                } else {
                    if (id === firstMistakeCard.id) {
                        setImage('./pineapple.svg');
                        setText('pineapple');
                    } else if (id === secondMistakeCard.id) {
                        setImage('./lemon.svg');
                        setText('lemon');
                    } else {
                        if (currentCard.name === 'lemon') {
                            setImage('./lemon.svg');
                            setText('lemon');
                        } else {
                            setImage('./pineapple.svg');
                            setText('pineapple');
                        }
                    }
                }
                dispatch(finishGame())
            }
        }
    };

    return (
        <StyledCard
            key={id}
            layout
            initial={{ rotateY: 180 }}
            animate={isFlipped || !gameStarted ? { rotateY: 0 } : { rotateY: 180 }}
            onClick={() => handleFlip(id)}
            transition={{ type: 'spring', stiffness: 150, damping: 25 }}>
            {!gameStarted ? (
                <>
                    <Image src={img} width={50} height={50} alt='' />
                    <p>{name}</p>
                </>
            ) : isFlipped ? (
                <>
                    <Image src={image} width={50} height={50} alt='' />
                    <p>{text}</p>
                </>
            ) : null}
        </StyledCard>
    );
};

export default Card;
