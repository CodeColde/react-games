import React from 'react';
import GameListItem, { IGameListItem } from './GameListItem';
import styled from 'styled-components';
import FilterTitle from 'components/molecules/FilterTitle';
import theme from 'constants/theme';

interface GameData {
    data: Array<IGameListItem>;
    data_stream: "viewership";
}

interface Props {
    data: GameData;
    preparingImages: boolean;
}

const GameList: React.FC<Props> = ({ preparingImages, data }) => {
    const [sortBy, setSortBy] = React.useState('rank');
    const [asc, setAsc] = React.useState(false);

    const filteredData = data && data.data && data.data.filter((item) => {
        if(item.game.indexOf(':') >= 0) {
            const exists = data.data.find(
                (search) => {
                    return search.game === item.game.replace(":", "");
                }
            );
            return !exists;
        }
        return true;
    });

    const sortedData = filteredData.sort((prev, curr) => {
        switch(sortBy) {
            case 'rank':
                return curr.current_rank < prev.current_rank ? 1 : -1;
            case 'alphabetical':
                return curr.game < prev.game ? 1 : -1;
            case 'genre':
                return curr.genre < prev.genre ? 1 : -1;
            case 'random':
                return Math.round(Math.random() * 10) >= 5 ? 1 : -1;
            case 'publisher':
                return curr.publisher < prev.publisher ? 1 : -1;
            default:
                return 1;
        }
    });

    const ascDescData = asc ? sortedData : sortedData.reverse();

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
            <Wrapper preparingImages={preparingImages}>
                {ascDescData && ascDescData.map((entry, i) => (
                    <GameListItem game={entry} key={i} />
                ))}
            </Wrapper>
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