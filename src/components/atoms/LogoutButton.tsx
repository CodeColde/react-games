import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux-state/login/actions';
import { LogoutAction } from 'redux-state/login/types';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import theme from 'constants/theme';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';

interface Props extends RouteComponentProps<any>{
    logout: LogoutAction;
    darkMode: DarkMode;
}

const LogoutButton: React.FC<Props> = ({ logout, darkMode, history }) => {
    const handleClick = () => {
        logout();
        history.push("/");
    }

    return (
        <Button onClick={handleClick} darkMode={darkMode}>Logout</Button>
    );
};

export default withRouter(
    connect(
        ({ darkMode }: AppState) => ({ darkMode }),
        { logout }
    )(LogoutButton)
);

const Button = styled.button<{ darkMode: DarkMode; }>`
    border: 0;
    outline: 0;
    background-color: transparent;
    color: ${({ darkMode }) => darkMode ? theme.colors.lightWhite : theme.colors.black};
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    align-self: flex-end;

    &:hover {
        cursor: pointer;
        color: ${theme.colors.green};
    }

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        align-self: center;
        margin-bottom: 0;
    }
`;