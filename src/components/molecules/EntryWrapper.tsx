import React from 'react';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';
import Footer from 'components/organisms/Footer';
import Heading from './Heading';

interface Props {
    darkMode: DarkMode;
}

const EntryWrapper: React.FC<Props> = ({ darkMode, children }) => {
    return (
        <Wrapper darkMode={darkMode}>
            <Heading />
            <Body>
                <Inner darkMode={darkMode}>
                    {children}
                </Inner>
            </Body>
            <Footer />
        </Wrapper>
    );
};

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(EntryWrapper);

const Wrapper = styled.div<Props>`
    font-family: Arial, Helvetica, sans-serif;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${({ darkMode }) => darkMode ? theme.colors.lightBlack : theme.colors.white};
`;

const Body = styled.main`
    height: 100%;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const Inner = styled.div<Props>`
    background-color:${({ darkMode }) => darkMode ? theme.colors.black : theme.colors.lightWhite};
    color: ${theme.colors.white};
    padding: 5rem;
    width: 50rem;
    box-sizing: border-box;
    border-radius: 5px;
    text-align: center;
    box-shadow: -5px 7px 25px ${({ darkMode }) => darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)'};

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        width: 100%;
        padding: 5rem 2rem;
    }
`;