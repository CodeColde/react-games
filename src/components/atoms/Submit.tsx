import React from 'react';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    darkMode: DarkMode;
}

const Submit: React.FC<Props> = ({ darkMode, children, ...rest }) => {
    return (
        <Button
            darkMode={darkMode}
            {...rest}
        >
            {children}
        </Button>
    )
}

const mapStateToProps = ({ darkMode }: AppState) => {
    return {
        darkMode
    };
};

export default connect(
    mapStateToProps
)(Submit);


const Button = styled.button<{ darkMode: DarkMode; }>`
    box-sizing: border-box;
    border: 1px solid ${({ darkMode }) => darkMode ? theme.colors.lightBlue : theme.colors.blue};
    background-color: ${({ darkMode }) => darkMode ? theme.colors.lightBlue : theme.colors.blue};
    color: ${theme.colors.white};
    text-decoration: none;
    padding-bottom: 2px;
    outline: 0;
    padding: 1rem 0.4rem;
    display: block;
    margin: 2rem auto;
    width: 100%;
    font-size: 1.4rem;

    &:hover {
        cursor: pointer;
    }
`;