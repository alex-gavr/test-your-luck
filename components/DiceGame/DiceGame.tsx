import { DiceWithAnimation } from 'cyber-dice';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { NextGame, StartGameButton } from '../SubHeading';

const StyledDiv = styled.div<any>((props) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
}));

const FlexRow = styled(StyledDiv)({
    flexFlow: 'row nowrap',
    gap: '1rem',
});
const NumberContainer = styled.li<any>((props) => ({
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: props.userChoice ? '3px solid green' : 'null',
}));




const diceNumbers: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4, 5, 6];
const DiceGame = () => {
    const [userChoice, setUserChoice] = useState<1 | 2 | 3 | 4 | 5 | 6 | undefined>(undefined);

    const [randomNumber, setRandomNumber] = useState(1);
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
        } else {
            const newRandomNumber = Math.floor(Math.random() * 6) + 1;
            setRandomNumber(newRandomNumber);
            setShowHint(true);
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

    return (
        <StyledDiv userChoice={userChoice}>
            <p>Choose Outcome: </p>
            <FlexRow as='ul'>
                {diceNumbers.map((value, index) => (
                    <NumberContainer userChoice={userChoice === index + 1 ? true : false} key={index} onClick={() => handleUserChoice(value)}>
                        <span>{value}</span>
                    </NumberContainer>
                ))}
            </FlexRow>
            <DiceWithAnimation randomNumber={randomNumber} isAnimation={isAnimating} animationEndHandler={animationEndHandler} />
            {isUserWon && <p> You guessed correctly! Nice!</p>}
            {showHint && <p> Common, make a guess!</p>}
            {isUserWon ? (
                <NextGame href={'./find-pairs'}>Next Game</NextGame>
            ) : (
                <StartGameButton type='button' disabled={isAnimating} onClick={clickHandler}>
                    Roll
                </StartGameButton>
            )}
        </StyledDiv>
    );
};

export default DiceGame;