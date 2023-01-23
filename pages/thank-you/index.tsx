import { ButtonsContainer, FlexCCC, StyledLinkError, StyledLinkPrimary, StyledSection } from '@/components/styles';
import { useAppSelector } from '@/services/hook';
import ym from 'react-yandex-metrika';
import styled from 'styled-components';

const ThankYou = () => {
    const { fromMainExit } = useAppSelector((state) => state.mainExit);
    const handleYes = () => {
        ym('reachGoal', 'liked');
    };
    const handleNo = () => {
        ym('reachGoal', 'disliked');
    };
    return (
        <StyledSection>
            <FlexCCC style={{ gap: '1rem' }}>
                {fromMainExit && <p style={{ textAlign: 'center' }}>Sorry, currently, there are no offers available </p>}
                <h1 style={{ textAlign: 'center' }}>Thank you for playing!</h1>
            </FlexCCC>
            <p>Did you like it?</p>
            <ButtonsContainer>
                <StyledLinkError href={'https://www.google.com/'} onClick={handleNo}>
                    No
                </StyledLinkError>
                <StyledLinkPrimary href={'https://www.google.com/'} onClick={handleYes}>
                    Yes
                </StyledLinkPrimary>
            </ButtonsContainer>
        </StyledSection>
    );
};

export default ThankYou;
