import { ButtonsContainer, StyledLinkPrimary, StyledLinkError, StyledSection } from '@/components/styles';
import React from 'react';

const Age = () => {
    return (
        <StyledSection>
            <h2>Are you 18 or older?</h2>
            <ButtonsContainer>
                <StyledLinkPrimary href={'/final-screen'} >Yes ✅</StyledLinkPrimary>
                <StyledLinkError href={'/teen-exit'}>No ❌</StyledLinkError>
            </ButtonsContainer>
        </StyledSection>
    );
};

export default Age;
