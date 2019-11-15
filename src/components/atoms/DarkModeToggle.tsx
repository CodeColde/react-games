import React from 'react';
import { AppState } from 'redux-state';
import { toggleDarkMode } from 'redux-state/darkmode/actions';
import { connect } from 'react-redux';
import { DarkMode, ToggleModeAction } from 'redux-state/darkmode/types';
import styled from 'styled-components';
import theme from 'constants/theme';

interface Props {
    darkMode: DarkMode;
    toggleDarkMode: ToggleModeAction;
}


const DarkModeToggle: React.FC<Props> = ({ toggleDarkMode, darkMode }) => {
    return (
        <Toggle onClick={() => toggleDarkMode()} isDark={darkMode}>{darkMode ? "Light" : "Dark"} Mode</Toggle>
    );
};

const mapStateToProps = ({ darkMode }: AppState) => {
    return {
        darkMode
    };
};

export default connect(
    mapStateToProps,
    { toggleDarkMode }
)(DarkModeToggle);

const Toggle = styled.button<{ isDark: DarkMode; }>`
    margin: 0 1rem;
    border: 0;
    outline: 0;
    padding-bottom: 3px;
    background: transparent;
    color: ${({ isDark }) => isDark ? theme.colors.white : theme.colors.black};

    &:hover {
        cursor: pointer;
    }
`;