
import Head from 'next/head';
import CardsGame from '@/components/CardsGame/CardsGame';
import { SubHeading } from '@/components/SubHeading';

const FindPairs = () => {
    return (
        <>
            <Head>
                <title>Text You Luck</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <SubHeading>Find Pairs</SubHeading>
            <CardsGame />
        </>
    );
};

export default FindPairs;