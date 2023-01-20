import Link from "next/link";
import styled from "styled-components";


export const StyledMain = styled.main({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    width: '100%',
    padding: '1.5rem',
    position: 'relative',
    '@media only screen and (max-width: 500px)': {
        padding: '0.5rem',
    },
});

export const StyledSection = styled.section((props) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    flex: '1 1 0'
}))

export const FlexCCC = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})


export const SubHeading = styled.h2((props) => ({
    textAlign: 'center',
    color: props.theme.colors.secondaryDark,
}));


export const NextGame = styled(Link)((props) => ({
    height: 'auto',
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
    background: `linear-gradient(132deg, rgba(255,226,140,1) 0%, rgba(201,255,209,1) 100%)`,
    color: 'black',
    border: `1px solid ${props.theme.colors.secondaryDark}`,
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
}));

export const StartGameButton = styled.button((props) => ({
    height: 'auto',
    width: 150,
    backgroundColor: props.theme.colors.secondaryDark,
    color: props.theme.colors.background,
    border: 'none',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
}));

export const ButtonsContainer = styled.div((props) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
}));



export const StyledLinkPrimary = styled(Link)((props) => ({
    width: 'auto',
    height: 'auto',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${props.theme.colors.secondaryDark}`,
    cursor: 'pointer',
    borderRadius: '1rem'
}));
export const StyledLinkError = styled(StyledLinkPrimary)((props) => ({
    border: `1px solid ${props.theme.colors.error}`,
}));

export const StyledBottomDiv = styled.div((props) => ({
    position: 'absolute',
    bottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
}))

