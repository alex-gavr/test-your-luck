import { FlexCCC, StyledLinkPrimary, StyledSection, SubHeading } from '@/components/styles';
import { useAppDispatch } from '@/services/hook';
import { initMainExit } from '@/services/mainExitSlice';
import ym from 'react-yandex-metrika';

const FinalScreen = () => {
    const dispatch = useAppDispatch();
    const handleMainExit = () => {
        ym('reachGoal','mainExit');
        dispatch(initMainExit());
    }
    return (
        <StyledSection>
            <FlexCCC>
                <SubHeading>You are luckier than 98.4% of the population!</SubHeading>
                <p style={{ textAlign: 'center' }}>Use luck to your advantage, benefit from these offers now:</p>
            </FlexCCC>
            <StyledLinkPrimary href={'/thank-you'} onClick={handleMainExit}> Get Offers</StyledLinkPrimary>
        </StyledSection>
    );
};

export default FinalScreen;
