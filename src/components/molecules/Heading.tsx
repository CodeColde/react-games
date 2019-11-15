import React from 'react';
import styled from 'styled-components';
import Header from '../atoms/Header';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';
import theme from 'constants/theme';
import { UserLogin } from 'redux-state/login/types';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import UserShow from './UserShow';

interface Props {
    darkMode: DarkMode;
    login?: UserLogin;
}

const Heading: React.FC<Props> = ({ darkMode, login }) => {
    return (
        <>
            <Wrapper darkMode={darkMode} login={login}>
                <Navigation>
                    <Logo to="/">
                        <Title variant="Big">Gameflix</Title>
                    </Logo>
                    <NavContent>
                        {login && login.username && <NavLinks />}
                    </NavContent>
                </Navigation>
                {login && login.username && <UserShow />}
            </Wrapper>
            <SubNav darkMode={darkMode}>
                {login && login.username && <NavLinks />}
            </SubNav>
        </>
    );
};

export default connect(
    ({ darkMode, login }: AppState) => ({
        darkMode,
        login
    })
)(Heading);

const Wrapper = styled.header<Props>`
    box-sizing: border-box;
    min-height: 5rem;
    width: 100%;
    padding: 1rem 5rem;
    color: ${({ darkMode }) => darkMode ? theme.colors.black : theme.colors.lightWhite};
    ${({ darkMode, login }) =>
        login && login.username &&
        `background-color: ${darkMode ? theme.colors.black : theme.colors.lightWhite};`
    }
    text-align: center;
    border-bottom: 0;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        padding: 1rem 2rem;
    }
`;

const NavContent = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        display: none;
    }
`;

const SubNav = styled.div<Props>`
    display: none;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding: 1rem 2rem;
        background-color: ${({ darkMode }) => darkMode ? theme.colors.darkBlack : theme.colors.darkWhite};
        width: 100%;
    }
`;

const Title = styled(Header)`
    margin: 0;
    padding: 0 5rem 0 0;
`;

const Navigation = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const Logo = styled(Link)`
    text-decoration: none;
`;