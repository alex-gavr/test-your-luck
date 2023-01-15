import { resetCardGame } from '@/services/cardsGameSlice';
import { useAppDispatch } from '@/services/hook';
import { useRouter } from 'next/router';
import React from 'react';
import { ButtonsContainer, StartGameButton, StyledBottomDiv, StyledLinkPrimary } from './styles';

const Restart = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleRestart = () => {
        dispatch(resetCardGame());
        router.push('/');
    };
    return (
        <StyledBottomDiv>
            <p>Wanna start again?</p>
            <ButtonsContainer>
                <StartGameButton onClick={handleRestart}>Restart</StartGameButton>
                <StyledLinkPrimary href={'https://google.com/'}>Nah, I am good</StyledLinkPrimary>
            </ButtonsContainer>
        </StyledBottomDiv>
    );
};

export default Restart;
