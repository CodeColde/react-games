import React from 'react';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    darkMode: DarkMode;
}

const TextInput: React.FC<Props> = ({ darkMode, ...rest }) => {
    return (
        <Field
            type="text"
            darkMode={darkMode}
            {...rest}
        />
    )
}

const mapStateToProps = ({ darkMode }: AppState) => {
    return {
        darkMode
    };
};

export default connect(
    mapStateToProps
)(TextInput);


const Field = styled.input<{ darkMode: DarkMode; }>`
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid ${({ darkMode }) => darkMode ? theme.colors.white : theme.colors.black};
    outline: 0;
    padding: 1rem 0.4rem;
    display: block;
    background-color: transparent;
    margin: 2rem auto;
    width: 100%;
    font-size: 1.4rem;
    color: ${({ darkMode }) => darkMode ? theme.colors.white : theme.colors.black};

    &::placeholder {
        color: ${({ darkMode }) => darkMode ? theme.colors.white : theme.colors.black};
        opacity: 0.4;
    }
`;