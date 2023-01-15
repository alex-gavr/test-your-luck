import styled from 'styled-components';
import { animate, AnimationControls, m, TargetAndTransition, useAnimationControls, VariantLabels, Variants } from 'framer-motion';
import Image from 'next/image';
import { ICardsData } from '@/types';
import {  useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import { flipCard } from '@/services/cardsGameSlice';

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
    },
    '@media only screen and (max-width: 500px)': {
        '& > img': {
            width: '2em',
            height: '2em',
        },
    },
}));

const flipAnimation = {
    hidden: { rotateY: 0 },
    visible: {
        rotateY: 170,
        x: [-50, 50, 0],
        transition: {
            duration: 0.4,
        },
    },
    exit: { rotateY: 170, transition: { duration: 3 } },
};

interface IProps extends ICardsData {
    variants?: Variants;
    animate?: boolean | TargetAndTransition | AnimationControls | VariantLabels | undefined;
}
const Card = ({ img, name, animate, id }: IProps) => {
    const dispatch = useAppDispatch();
    const { flippedCardsCount, gameStarted } = useAppSelector((state) => state.cardsGame);
    const [isFlipped, setIsFlipped] = useState(false);
    const [image, setImage] = useState('');
    const [text, setText] = useState('');

    const handleFlip = () => {
        if (isFlipped) {
            return;
        } else {
            dispatch(flipCard());
            setIsFlipped(!isFlipped);
            if (flippedCardsCount === 0) {
                setImage('./apple.svg');
                setText('apple');
            } else if (flippedCardsCount === 1) {
                setImage('./apple.svg');
                setText('apple');
            } else if (flippedCardsCount === 2) {
                setImage('./cherry.svg');
                setText('cherry');
            } else if (flippedCardsCount === 3) {
                setImage('./cherry.svg');
                setText('cherry');
            } else if (flippedCardsCount === 4) {
                setImage('./strawberry.svg');
                setText('strawberry');
            } else if (flippedCardsCount === 5) {
                setImage('./strawberry.svg');
                setText('strawberry');
            } else if (flippedCardsCount === 6) {
                setImage('./pineapple.svg');
                setText('pineapple');
            } else if (flippedCardsCount === 7) {
                setImage('./pineapple.svg');
                setText('pineapple');
            } else if (flippedCardsCount === 8) {
                setImage('./lemon.svg');
                setText('lemon');
            } else if (flippedCardsCount === 9) {
                setImage('./lemon.svg');
                setText('lemon');
            }
        }
    };

    return (
        <StyledCard
            key={id}
            layout
            animate={animate}
            whileTap={{rotateY: 0}}
            onTap={handleFlip}
            onTapCancel={handleFlip}
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
