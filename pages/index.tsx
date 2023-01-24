import DiceGame from '@/components/DiceGame/DiceGame';
import { StyledSection, SubHeading } from '@/components/styles';

export default function Dice() {
    return (
        <StyledSection>
            <SubHeading>Can you guess the next roll?</SubHeading>
            <DiceGame />
        </StyledSection>
    );
}
