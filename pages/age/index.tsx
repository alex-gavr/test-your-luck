import { ButtonsContainer, StyledLinkPrimary, StyledLinkError, StyledSection } from '@/components/styles';
import React from 'react';
import ym from 'react-yandex-metrika';

const Age = () => {

    const handleYes = () => {
        ym('reachGoal','adult')
    };
    const handleNo = () => {
        ym('reachGoal','child')
    };
    return (
        <StyledSection>
            <h2>Are you 18 or older?</h2>
            <ButtonsContainer>
                <StyledLinkPrimary href={'/final-screen'} onClick={handleYes}>Yes ✅</StyledLinkPrimary>
                <StyledLinkError href={'/thank-you'} onClick={handleNo}>No ❌</StyledLinkError>
            </ButtonsContainer>
        </StyledSection>
    );
};

export default Age;
