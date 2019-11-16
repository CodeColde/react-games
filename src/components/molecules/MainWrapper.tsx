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

const MainWrapper: React.FC<Props> = ({ darkMode, children }) => {
    return (
        <Wrapper darkMode={darkMode}>
            <Heading />
            <Body darkMode={darkMode}>
                {children}
            </Body>
            <Footer />
        </Wrapper>
    );
};

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(MainWrapper);

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

const Body = styled.main<Props>`
    width: 100%;
    height: 100%;
    padding: 2rem 5rem;
    box-sizing: border-box;
    position: relative;
    flex-grow: 1;
    color: ${({ darkMode }) => darkMode ? theme.colors.lightWhite : theme.colors.black};

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        padding: 170px 2rem 2rem;
    }
`;