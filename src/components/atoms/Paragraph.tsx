import React from 'react';
import { DarkMode } from 'redux-state/darkmode/types';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';

interface Props {
    darkMode: DarkMode;
}

const Paragraph: React.FC<Props> = ({ darkMode, children }) => {
    return (
        <Text darkMode={darkMode}>{children}</Text>
    );
};

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(Paragraph);

const Text = styled.p<Props>`
    color: ${({ darkMode }) => darkMode ? theme.colors.white : theme.colors.black};
    word-wrap: break-word;
    line-height: 1.5;
`;