import React from 'react';
import Header from 'components/atoms/Header';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';

interface Props {
    darkMode: DarkMode;
    sortOptions: string[];
    setting: string;
    order?: boolean;
    setSortBy: (string: string) => void;
    setAsc?: (bool: boolean) => void;
}

const FilterTitle: React.FC<Props> = ({ darkMode, sortOptions, setting, order, setSortBy, setAsc, children }) => {
    const [show, setShow] = React.useState(false);

    const handleSort = (str: string) => {
        setShow(false);
        setSortBy(str);
    }

    return (
        <Wrapper variant="Big">
            {`View all ${children} by `}
            <Span onClick={() => setShow(!show)} darkMode={darkMode}>
                {setting}
                <Dropdown show={show} darkMode={darkMode}>
                    {sortOptions.map((option) => (
                        <List
                            key={option}
                            onClick={() => handleSort(option)}
                            selected={option === setting}
                            darkMode={darkMode}
                        >
                            {option}
                        </List>
                    ))}
                </Dropdown>
            </Span>
            {setAsc && (
                <>
                    {' in order of '}
                    <Span
                        darkMode={darkMode}
                        onClick={() => setAsc(!order)}
                    >
                        {order ? 'ascending' : 'descending'}
                    </Span>
                </>
            )}
        </Wrapper>
    )
}

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(FilterTitle);

const Wrapper = styled(Header)`
    position: relative;
    line-height: 1.5;
`;

const Span = styled.span<{ darkMode: DarkMode; }>`
    padding-bottom: 3px;
    border-bottom: 3px solid ${({ darkMode }) => darkMode ? theme.colors.lightWhite : theme.colors.black};
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
    @media screen and (min-width: ${theme.mediaQueries.width.s}) {
        position: relative;
    }
`;

const Dropdown = styled.ul<{ show: boolean; darkMode: DarkMode; }>`
    display: ${({ show }) => show ? 'block' : 'none'};
    opacity: ${({ show }) => show ? 1 : 0};
    position: absolute;
    top: 1rem;
    left: -2rem;
    background-color: ${({ darkMode }) => darkMode ? theme.colors.black : theme.colors.white};
    padding: 1rem 2rem 2rem;
    list-style: none;
    border-radius: 5px;
    z-index: 2;
    box-shadow: -5px 5px 15px 0px rgba(0,0,0,0.1);

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        left: 0;
    }
`;

const List = styled.li<{ selected: boolean; darkMode: DarkMode; }>`
    margin: 0;
    padding: 0;
    color: ${({ selected, darkMode }) =>
        selected
        ? theme.colors.green
        : darkMode
            ? theme.colors.lightWhite
            : theme.colors.black
    };
    transition: color 0.2s ease-in-out;

    &:hover {
        color: ${theme.colors.green};
        cursor: pointer;
    }
`;