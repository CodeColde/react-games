import React from 'react';
import SearchIcon from 'components/atoms/SearchIcon';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';
import { retrieve } from '@codecolde/use-fetch';
import { ISearchGame } from 'entities/Generics';
import SearchItem from './SearchItem';
import Header from 'components/atoms/Header';

interface Props {
    darkMode: DarkMode;
}

const Search: React.FC<Props> = ({ darkMode }) => {
    const [search, setSearch] = React.useState('');
    const [searchData, setData] = React.useState([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!!search) {
            const { data } = retrieve("allGames", "local");
            const newData = data.filter((item: ISearchGame) => (
                item.game.toLowerCase().indexOf(search.toLowerCase()) >= 0
            ));
            const sortNewData = newData.sort((curr: ISearchGame, prev: ISearchGame) => {
                return curr.game > prev.game ? 1 : -1;
            });
            setData(sortNewData);
        } else {
            setData([]);
        }
    }, [search]);

    return (
        <>
            <SearchBar>
                <Input
                    darkMode={darkMode}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Game..."
                    ref={inputRef}
                />
                <SearchBox
                    onClick={() => inputRef && inputRef.current && inputRef.current.focus()}
                >
                    <SearchIcon />
                </SearchBox>
            </SearchBar>
            <Results darkMode={darkMode} hasValue={!!search}>
                <List>
                    {searchData.length > 0
                        ? searchData.map((item) => (
                                <SearchItem data={item} handleClick={() => setSearch('')}/>
                            )
                        ) : <Header>No results found...</Header>
                    }
                </List>
            </Results>
        </>
    )
}

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(Search);

const SearchBar = styled.div`
    width: 40vw;
    margin-right: 1rem;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    @media screen and (max-width: ${theme.mediaQueries.width.l}){
        width: 100%;
        margin-bottom: 5px;
    }

    @media screen and (max-width: ${theme.mediaQueries.width.s}){
        align-items: center;
        margin-right: 0;
    }
`;

const SearchBox = styled.div`
    background-color: ${theme.colors.green};
    padding: 0.5rem 1rem;
    max-width: 57px;

    @media screen and (max-width: ${theme.mediaQueries.width.s}){
        padding: 0.25rem 0.5rem;
    }
`;

const Input = styled.input<Props>`
    width: calc(100% - 57px);
    border: 0;
    height: 100%;
    font-size: 1.6rem;
    outline: 0;
    color: ${({ darkMode }) => darkMode ? theme.colors.lightWhite : theme.colors.black};
    background-color: transparent;

    @media screen and (max-width: ${theme.mediaQueries.width.m}){
        width: calc(100% - 40px);
        font-size: 1rem;
    }
`;

const Results = styled.div<{ darkMode: DarkMode; hasValue: boolean; }>`
    display: ${({ hasValue }) => hasValue ? 'block' : 'none'};
    position: absolute;
    top: 92px;
    z-index: 2;
    padding: 2rem 0;
    left: 0;
    right: 0;
    background-color: ${({ darkMode }) => darkMode ? theme.colors.darkBlack : theme.colors.lightWhite};
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;

    @media screen and (max-width: ${theme.mediaQueries.width.s}){
        top: 170px;
    }
`;

const List = styled.div`
    padding: 1rem 5rem;
    box-sizing: border-box;
    height: 100%;

    @media screen and (max-width: ${theme.mediaQueries.width.m}){
        padding: 0 1rem;
    }
`;