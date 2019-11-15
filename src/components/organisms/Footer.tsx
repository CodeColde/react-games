import React from 'react';
import DarkModeToggle from 'components/atoms/DarkModeToggle';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';
import ExternalLink from 'components/atoms/ExternalLink';

interface Props {
    darkMode: DarkMode;
}

const Footer: React.FC<Props> = ({ darkMode }) => {
    return (
        <Wrapper darkMode={darkMode}>
            <ExternalLink url="http://github.com/CodeColde" noLine>&copy; Hayo Friese - 2019</ExternalLink>
            <DarkModeToggle />
        </Wrapper>
    );
};

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(Footer);

const Wrapper = styled.footer<Props>`
    height: 5rem;
    background-color: ${({ darkMode }) => darkMode ? theme.colors.black : theme.colors.lightWhite};
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    box-sizing: border-box;
    overflow-x: hidden;
`;