import Link from "next/link";
import styled from "styled-components";

export const SubHeading = styled.h2((props) => ({
    textAlign: 'center',
    color: props.theme.colors.secondaryDark,
}));


export const NextGame = styled(Link)((props) => ({
    width: 150,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
    backgroundColor: props.theme.colors.secondaryDark,
    color: props.theme.colors.background,
    border: 'none',
    padding: '1rem',
}));

export const StartGameButton = styled.button((props) => ({
    width: 150,
    height: 'auto',
    backgroundColor: props.theme.colors.secondaryDark,
    color: props.theme.colors.background,
    border: 'none',
    padding: '1rem',
}));