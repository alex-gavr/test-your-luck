import { DefaultTheme, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import GlobalStyle from '@/components/GlobalStyles';
import { LazyMotion } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '@/services/store';
import styled from 'styled-components';
import { Inter } from '@next/font/google';
import { StyledMain } from '@/components/styles';
import Image from 'next/image';
import ym, { YMInitializer } from 'react-yandex-metrika';
import { Analytics } from '@vercel/analytics/react';
import { useDarkMode } from '@/utils/useDarkMode';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

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
        overflowContainer: 'rgba(255, 255, 255, 0.75)',
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
        primaryLight: 'rgba(155, 155, 155, 0.2)',
        primaryMedium: 'rgb(255, 225, 31)',
        primaryDark: 'rgb(255, 194, 10)',
        secondaryLight: 'rgb(205, 240, 183)',
        secondaryMedium: 'rgb(205, 240, 153)',
        secondaryDark: 'rgb(101, 164, 111)',
        error: 'rgb(204, 0, 0)',
        overflowContainer: 'rgba(50, 50, 50, 0.9)',
    },
    fontSize: {
        body: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        button: 'clamp(1rem, 0.9295rem + 0.3419vw, 1.25rem)',
        subHeading: 'clamp(1.5rem, 1.2179rem + 1.3675vw, 2.5rem)',
        heading: 'clamp(2.75rem, 2.6442rem + 0.5128vw, 3.125rem)',
    },
};
const Logo = styled.div((props) => ({
    backgroundColor: props.theme.colors.primaryLight,
    padding: '0.5rem 1rem',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5rem',
    boxShadow: '1px 1px 5px 2px rgba(0, 0, 0, 0.2)',
}));

const StyledHeading = styled.h1((props) => ({
    textAlign: 'center',
    fontSize: '1.3rem',
    color: props.theme.colors.secondaryDark,
}));

const HeadingContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    top: '1rem',
    width: '100%',
    '& > p': {
        fontSize: '0.7rem',
    },
});

export default function App({ Component, pageProps, router }: AppProps) {
    const { theme, toggleTheme, componentMounted } = useDarkMode();
    const themeMode = theme === 'light' ? light : dark;
    useEffect(() => {
        if (componentMounted) {
            if (theme === 'light') {
                ym('reachGoal', 'lightMode');
            } else {
                ym('reachGoal', 'darkMode');
            }
        }
    }, [componentMounted, theme]);

    if (!componentMounted) {
        return <div style={{ width: '100vw', height: '100vh' }} />;
    }

    return (
        <LazyMotion features={async () => (await import('../components/domMax')).default}>
            <Provider store={store}>
                <ThemeProvider theme={themeMode}>
                    <YMInitializer accounts={[92124733]} options={{ webvisor: true }} version='2' />
                    <GlobalStyle />
                    <Analytics />
                    <StyledMain className={inter.className}>
                        <HeadingContainer>
                            <Logo>
                                <Image src={'./luck.svg'} alt='' width={30} height={30} style={{ rotate: '-20deg' }} />
                                <StyledHeading>Test Your Luck</StyledHeading>
                            </Logo>
                            {router.pathname === '/' && <p>Mini Game 1 out of 2</p>}
                            {router.pathname === '/find-pairs' && <p>Mini Game 2 out of 2</p>}
                            {router.pathname === '/age' && <p>Question 1 out of 1</p>}
                        </HeadingContainer>
                        <Component {...pageProps} />
                    </StyledMain>
                </ThemeProvider>
            </Provider>
        </LazyMotion>
    );
}
