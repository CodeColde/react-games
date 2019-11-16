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
import Search from './Search';

interface Props {
    darkMode: DarkMode;
    login?: UserLogin;
}

const Heading: React.FC<Props> = ({ darkMode, login }) => {
    return (
        <Container darkMode={darkMode} login={login}>
            <Wrapper>
                <Navigation>
                    <Logo to="/">
                        <Title variant="Big">Gameflix</Title>
                    </Logo>
                    <NavContent>
                        {login && login.username && <NavLinks />}
                        {login && login.username && <Search />}
                    </NavContent>
                </Navigation>
                {login && login.username && <UserShow />}
            </Wrapper>
            {login && login.username &&
                <SubNav darkMode={darkMode}>
                    <NavLinks />
                    <Search />
                </SubNav>
            }
        </Container>
    );
};

export default connect(
    ({ darkMode, login }: AppState) => ({
        darkMode,
        login
    })
)(Heading);

const Container = styled.header<Props>`
    display: block;
    box-sizing: border-box;
    min-height: 5rem;
    width: 100%;
    color: ${({ darkMode }) => darkMode ? theme.colors.black : theme.colors.lightWhite};
    ${({ darkMode, login }) =>
        login && login.username &&
        `background-color: ${darkMode ? theme.colors.black : theme.colors.lightWhite};`
    }
    border-bottom: 0;
    position: relative;

    @media screen and (max-width: ${theme.mediaQueries.width.s}){
        position: fixed;
        width: 100vw;
        z-index: 3;
    }
`;

const Wrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5rem;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        padding: 1rem 2rem;
    }
`;

const NavContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;

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
        align-items: center;
        justify-content: space-evenly;
        padding: 1rem 2rem;
        background-color: ${({ darkMode }) => darkMode ? theme.colors.darkBlack : theme.colors.darkWhite};
        width: 100%;
    }
`;

const Title = styled(Header)`
    margin: 0;
    padding: 0 5rem 0 0;

    @media screen and (max-width: ${theme.mediaQueries.width.s}){
        padding: 1rem
    }
`;

const Navigation = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const Logo = styled(Link)`
    text-decoration: none;
`;