import { FlexCCC, StyledLinkPrimary, StyledSection, SubHeading } from '@/components/styles';

const FinalScreen = () => {
    return (
        <StyledSection>
            <FlexCCC>
                <SubHeading>You are luckier than 98.4% of the population!</SubHeading>
                <p style={{ textAlign: 'center' }}>Use luck to your advantage, benefit from these offers now:</p>
            </FlexCCC>
            <StyledLinkPrimary href={'/main-exit'}> Get Offers</StyledLinkPrimary>
        </StyledSection>
    );
};

export default FinalScreen;
