import Head from 'next/head';
import { Inter } from '@next/font/google';
import styled from 'styled-components';
import CardsGame from '@/components/CardsGame/CardsGame';

const StyledMain = styled.main({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    padding: '1.5rem',
    gap: '3rem',
    '@media only screen and (max-width: 500px)': {
      padding: '0.5rem',
    }
});

const StyledHeading = styled.h1((props) => ({
    backgroundColor: props.theme.colors.secondaryDark,
    padding: '0.5rem 1rem',
    textAlign: 'center',
    boxShadow: '1px 1px 20px 5px rgba(0, 0, 0, 0.2)',
    color: props.theme.colors.primaryLight,
}));
const SubHeading = styled.h2((props) => ({
  textAlign: 'center',
  color: props.theme.colors.secondaryDark,
}));
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StyledMain className={inter.className}>
                <StyledHeading>Test Your Luck</StyledHeading>
                <SubHeading>Find Pairs</SubHeading>
                <CardsGame />
            </StyledMain>
        </>
    );
}
