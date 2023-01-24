import CardsGame from '@/components/CardsGame/CardsGame';
import { StyledSection, SubHeading } from '@/components/styles';

const FindPairs = () => {
    return (
        <StyledSection>
            <SubHeading as={'h1'}>Find Pairs</SubHeading>
            <CardsGame />
        </StyledSection>
    );
};

export default FindPairs;
