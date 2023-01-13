import { DefaultTheme, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import GlobalStyle from '@/components/GlobalStyles';
import { LazyMotion } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from '@/services/store';

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

export default function App({ Component, pageProps }: AppProps) {
    return (
        <LazyMotion features={async () => (await import('../components/domMax')).default}>
            <Provider store={store}>
                <ThemeProvider theme={light}>
                    <GlobalStyle />
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        </LazyMotion>
    );
}
