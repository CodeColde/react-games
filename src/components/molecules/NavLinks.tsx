import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from 'constants/theme';
import Header from 'components/atoms/Header';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';

interface Props {
    darkMode: DarkMode
}

const NavLinks: React.FC<Props> = ({ darkMode }) => {
    const currentPage = (page: string): boolean => (
        window.location.pathname.indexOf(page) >= 0
    );

    return (
        <>
            <Navlink to="/browse/">
                <Title
                    variant="Medium"
                    darkMode={darkMode}
                    isCurrentPage={currentPage('browse')}
                >
                    Browse
                </Title>
            </Navlink>
            <Navlink to="/genre/">
                <Title
                    variant="Medium"
                    darkMode={darkMode}
                    isCurrentPage={currentPage('genre')}
                >
                    Genre
                </Title>
            </Navlink>
        </>
    );
};

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(NavLinks);

const Navlink = styled(Link)`
    text-decoration: none;
    padding-bottom: 5px;
`;

const Title = styled(Header)<{isCurrentPage: boolean; darkMode: DarkMode;}>`
    color: ${({ isCurrentPage, darkMode }) =>
        isCurrentPage
            ? theme.colors.green
            : darkMode
                ? theme.colors.lightWhite
                : theme.colors.black
    };
    margin: 0;
    padding: 0 5rem 0 0;
`;