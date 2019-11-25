import React from 'react';
import GameListItem, { IGameListItem } from './GameListItem';
import styled from 'styled-components';
import FilterTitle from 'components/molecules/FilterTitle';
import theme from 'constants/theme';
import NotFound from './NotFound';

interface GameData {
    data: Array<IGameListItem>;
    data_stream: "pc_player_usage";
}

interface Props {
    data: GameData;
    preparingImages: boolean;
}

const GameList: React.FC<Props> = ({ preparingImages, data }) => {
    const [sortBy, setSortBy] = React.useState('rank');
    const [asc, setAsc] = React.useState(false);

    const filteredData = data && data.data && data.data.filter((item) => {
        if(item.title.indexOf(':') >= 0) {
            const exists = data.data.find(
                (search) => {
                    return search.title === item.title.replace(":", "");
                }
            );
            return !exists;
        }
        return true;
    });

    const sortedData = filteredData ? filteredData.sort((prev, curr) => {
        switch(sortBy) {
            case 'rank':
                return curr.rank < prev.rank ? 1 : -1;
            case 'alphabetical':
                return curr.title < prev.title ? 1 : -1;
            case 'genre':
                let sortNum = -1;
                if (curr.genre === null) {
                    sortNum = -1;
                }
                if (prev.genre === null) {
                    sortNum = 1;
                }
                if (curr.genre !== null && prev.genre !== null && curr.genre < prev.genre) {
                    sortNum = 1;
                }
                return sortNum;
            case 'random':
                return Math.round(Math.random() * 10) >= 5 ? 1 : -1;
            case 'publisher':
                return curr.publisher < prev.publisher ? 1 : -1;
            default:
                return 1;
        }
    }) : 'error';

    const ascDescData = sortedData !== 'error' && (asc ? sortedData : sortedData.reverse());
    if (sortedData === 'error') {
        console.error(`Oops! Something went wrong. Either the API URL is incorrect or your requests aren't being authenticated. \n\n Check your REACT_APP_CLIENT_TOKEN in the .env file!`);
    }

    return (
        <>
            <FilterTitle
                sortOptions={['rank', 'random', 'alphabetical', 'genre', 'publisher']}
                setting={sortBy}
                setSortBy={setSortBy}
                order={asc}
                setAsc={setAsc}
            >
                games
            </FilterTitle>
            {sortedData !== 'error'
                ? <Wrapper preparingImages={preparingImages}>
                    {ascDescData && ascDescData.map((entry, i) => (
                        <GameListItem game={entry} key={i} />
                    ))}
                    </Wrapper>
                : <NotFound />
            }
        </>
    )
}

export default GameList;

const Wrapper = styled.div<{ preparingImages: boolean; }>`
    width: 100%;
    padding: 2rem 5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ${({ preparingImages }) => preparingImages && `display: none;`}

    @media screen and (max-width: ${theme.mediaQueries.width.l}) {
        padding: 2rem;

        > div {
            margin: 0 auto;
        }
    }

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        padding: 3rem 1rem;
        flex-direction: column;
        align-items: center;
    }
`;