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

const ContentWrapper: React.FC<Props> = ({ darkMode, children }) => {
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
)(ContentWrapper);

const Wrapper = styled.div<Props>`
    font-family: Arial, Helvetica, sans-serif;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${({ darkMode }) => darkMode ? theme.colors.lightBlack : theme.colors.white};
`;

const Body = styled.main`
    width: 100%;
    height: 100%;
    padding: 2rem 5rem 5rem;
    box-sizing: border-box;
    position: relative;
    flex-grow: 1;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        padding: calc(170px + 2rem) 0 5rem;
    }
`;

const Inner = styled.section<Props>`
    height: 100%;
    padding: 0 5rem;
    max-width: 100rem;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 0 auto;
    color: ${({ darkMode }) => darkMode ? theme.colors.lightWhite : theme.colors.black};

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        padding: 0 2rem;
    }
`;