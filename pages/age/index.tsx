import { ButtonsContainer, StyledLinkPrimary, StyledLinkError, StyledSection, SubHeading } from '@/components/styles';
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
            <SubHeading>Are you 18 or older?</SubHeading>
            <ButtonsContainer>
                <StyledLinkError href={'/thank-you'} onClick={handleNo}>No ❌</StyledLinkError>
                <StyledLinkPrimary href={'/final-screen'} onClick={handleYes}>Yes ✅</StyledLinkPrimary>
            </ButtonsContainer>
        </StyledSection>
    );
};

export default Age;
