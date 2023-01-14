import { DefaultTheme, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import GlobalStyle from '@/components/GlobalStyles';
import { LazyMotion } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '@/services/store';
import styled from 'styled-components';
import { Inter } from '@next/font/google';
import Link from 'next/link';

const light: DefaultTheme = {
    colors: {
        background: 'rgba(255, 255, 255, 1)',
        title: 'rgba(0, 0, 0, 1)',
        paragraph: 'rgba(0, 0, 0, 0.7)',
        primaryLight: 'rgb(248, 236, 155)',
        primaryMedium: 'rgb(255, 225, 31)',
        primaryDark: 'rgb(255, 194, 10)',
        secondaryLight: 'rgb(205, 240, 183)',
        secondaryMedium: 'rgb(205, 240, 183)',
        secondaryDark: 'rgb(101, 164, 111)',
        error: 'rgb(204, 0, 0)',
    },
    fontSize: {
        body: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        button: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        subHeading: 'clamp(1.5rem, 1.2179rem + 1.3675vw, 2.5rem)',
        heading: 'clamp(2.75rem, 2.6442rem + 0.5128vw, 3.125rem)',
    },
};

const dark: DefaultTheme = {
    colors: {
        background: 'rgba(0, 0, 0, 1)',
        title: 'rgba(255, 255, 255, 1)',
        paragraph: 'rgba(255, 255, 255, 0.7)',
        primaryLight: 'rgba(155, 155, 155, 0.1)',
        primaryMedium: 'rgb(255, 225, 31)',
        primaryDark: 'rgb(255, 194, 10)',
        secondaryLight: 'rgb(205, 240, 183)',
        secondaryMedium: 'rgb(205, 240, 153)',
        secondaryDark: 'rgb(101, 164, 111)',
        error: 'rgb(204, 0, 0)',
    },
    fontSize: {
        body: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        button: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        subHeading: 'clamp(1.5rem, 1.2179rem + 1.3675vw, 2.5rem)',
        heading: 'clamp(2.75rem, 2.6442rem + 0.5128vw, 3.125rem)',
    },
};

const StyledMain = styled.main({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    padding: '1.5rem',
    gap: '3rem',
    position: 'relative',
    '@media only screen and (max-width: 500px)': {
        padding: '0.5rem',
    },
});

const StyledHeading = styled.h1((props) => ({
    backgroundColor: props.theme.colors.secondaryDark,
    padding: '0.5rem 1rem',
    textAlign: 'center',
    boxShadow: '1px 1px 20px 5px rgba(0, 0, 0, 0.2)',
    color: props.theme.colors.primaryLight,
}));
const StyledLink = styled(Link)((props) => ({
    width: 'auto',
    height: 'auto',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${props.theme.colors.secondaryDark}`,
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    cursor: 'pointer',
}));

const HeadingContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
    position: 'absolute',
    top: '1rem',
});

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps, router }: AppProps) {
    return (
        <LazyMotion features={async () => (await import('../components/domMax')).default}>
            <Provider store={store}>
                <ThemeProvider theme={light}>
                    <GlobalStyle />
                    <StyledMain className={inter.className}>
                        <HeadingContainer>
                            <StyledHeading>Test Your Luck</StyledHeading>
                            <p>Game {router.pathname === '/' ? '1' : '2'} out of 3</p>
                        </HeadingContainer>
                        <StyledLink href={router.pathname === '/' ? '/find-pairs' : '/'}>Next Game</StyledLink>
                        <Component {...pageProps} />
                    </StyledMain>
                </ThemeProvider>
            </Provider>
        </LazyMotion>
    );
}
