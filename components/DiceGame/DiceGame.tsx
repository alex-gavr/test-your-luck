import { DiceWithAnimation } from 'cyber-dice';
import { useState } from 'react';
import styled from 'styled-components';
import { NextGame, StartGameButton } from '../styles';
import ym from 'react-yandex-metrika';
import { m } from 'framer-motion';

const StyledDiv = styled.div<any>((props) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
}));

const FlexRow = styled(StyledDiv)({
    flexFlow: 'row wrap',
    gap: '1rem',
    '& > li': {
        '@media only screen and (max-width: 400px)': {
            fontSize: '0.8rem',
        },
    },
});
interface IProps {
    $userChoice?: boolean;
    $showHint?: boolean;
}
const NumberContainer = styled.li<IProps>((props) => ({
    width: '40px',
    height: '40px',
    backgroundColor: props.theme.colors.primaryLight,
    color: props.theme.colors.title,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: props.$userChoice ? '3px solid #ffc20a ' : 'null',
}));

const diceNumbers: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4, 5, 6];

const DiceGame = () => {
    const rInt = Math.floor(Math.random() * 6) + 1;
    const [userChoice, setUserChoice] = useState<1 | 2 | 3 | 4 | 5 | 6 | undefined>(undefined);
    const [randomNumber, setRandomNumber] = useState(rInt);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isUserWon, setIsUserWon] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const clickHandler = () => {
        if (isUserWon) {
            setIsUserWon(false);
        }
        setIsAnimating(true);
        if (userChoice !== undefined) {
            setRandomNumber(userChoice);
            setShowHint(false);
            ym('reachGoal', 'rollDiceWithPrediction');
        } else {
            const newRandomNumber = Math.floor(Math.random() * 6) + 1;
            setRandomNumber(newRandomNumber);
            setShowHint(true);
            ym('reachGoal', 'rollDiceNoPrediction');
        }
    };
    const animationEndHandler = () => {
        setIsAnimating(false);
        if (userChoice !== undefined) {
            setRandomNumber(userChoice);
            setIsUserWon(true);
        }
        setUserChoice(undefined);
    };

    const handleUserChoice = (value: 1 | 2 | 3 | 4 | 5 | 6) => {
        if (isAnimating) {
            return;
        } else {
            setUserChoice(value);
        }
    };

    const handleNextGame = () => {
        ym('reachGoal', 'goToCardsGame');
    };

    return (
        <StyledDiv userChoice={userChoice}>
            <m.p animate={showHint ? { color: 'red', scale: [1, 1.2, 1] } : {}} transition={{ duration: 1 }}>
                Choose Outcome:{' '}
            </m.p>
            <FlexRow as='ul'>
                {diceNumbers.map((value, index) => (
                    <NumberContainer $userChoice={userChoice === index + 1 ? true : false} key={index} onClick={() => handleUserChoice(value)}>
                        <span>{value}</span>
                    </NumberContainer>
                ))}
            </FlexRow>
            <DiceWithAnimation randomNumber={randomNumber} isAnimation={isAnimating} animationEndHandler={animationEndHandler} />
            {isUserWon ? (
                <NextGame href={'./find-pairs'} onClick={handleNextGame}>
                    Next Game
                </NextGame>
            ) : (
                <StartGameButton type='button' disabled={isAnimating} onClick={clickHandler}>
                    Roll
                </StartGameButton>
            )}
            <p style={userChoice || isUserWon ? { fontSize: '0.8rem', visibility: 'visible' } : { fontSize: '0.8rem', visibility: 'hidden' }}>
                {userChoice ? 'Probability of the win: 16.6%' : isUserWon ? 'You guessed correctly! Nice!' : 'Removes Layout Shift'}
            </p>
        </StyledDiv>
    );
};

export default DiceGame;
