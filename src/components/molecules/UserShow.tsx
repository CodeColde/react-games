import React from 'react';
import Header from 'components/atoms/Header';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppState } from 'redux-state';
import { UserLogin } from 'redux-state/login/types';
import Paragraph from 'components/atoms/Paragraph';
import LogoutButton from 'components/atoms/LogoutButton';
import { DarkMode } from 'redux-state/darkmode/types';
import theme from 'constants/theme';

interface Props {
    darkMode: DarkMode;
    login: UserLogin;
}

const UserShow: React.FC<Props> = ({ darkMode, login }) => {
    const {firstName, lastName, username} = login;
    return (
        <Wrapper>
            <Header variant="Medium">
                {username}
                <Dropdown
                    darkMode={darkMode}
                >
                    <Name>{`${firstName} ${lastName}`}</Name>
                    <LogoutButton />
                </Dropdown>
            </Header>
        </Wrapper>
    );
};

export default connect(
    ({ darkMode, login }: AppState) => ({ darkMode, login })
)(UserShow);

const Wrapper = styled.div`
    position: relative;
    z-index: 1;

    &:hover {
        cursor: pointer;

        div {
            display: block;
        }
    }
`;

const Name = styled(Paragraph)`
    &:hover {
        color: ${theme.colors.green};
    }
`;

const Dropdown = styled.div<{ darkMode: DarkMode; }>`
    z-index: 2;
    position: absolute;
    background-color: white;
    border-radius: 5px;
    top: 70%;
    min-width:7rem;
    right: -2rem;
    text-align: right;
    padding: 0.5rem 2rem 1rem;
    box-shadow: -5px 5px 15px 0px rgba(0,0,0,0.1);
    display: none;

    &:hover {
        display: block;
    }
`;