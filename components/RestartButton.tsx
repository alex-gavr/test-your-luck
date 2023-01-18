import { resetCardGame } from '@/services/cardsGameSlice';
import { useAppDispatch } from '@/services/hook';
import { useRouter } from 'next/router';
import React from 'react';
import { StartGameButton, StyledBottomDiv } from './styles';

const RestartButton = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleRestart = () => {
        dispatch(resetCardGame());
        router.push('/');
    };
    return (
        <StyledBottomDiv style={{opacity: 0.4}}>
            <StartGameButton onClick={handleRestart}>Restart</StartGameButton>
        </StyledBottomDiv>
    );
};

export default RestartButton;
