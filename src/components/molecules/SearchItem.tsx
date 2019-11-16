import React from 'react';
import { ISearchGame } from 'entities/Generics';
import { DarkMode } from 'redux-state/darkmode/types';
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import CoverImage from 'components/atoms/CoverImage';
import Header from 'components/atoms/Header';
import GenreTag from './GenreTag';
import styled from 'styled-components';
import theme from 'constants/theme';
import Anchor from 'components/atoms/Anchor';

interface Props {
    data: ISearchGame;
    darkMode: DarkMode;
    handleClick: () => void;
}
const SearchItem: React.FC<Props> = ({ data, darkMode, handleClick }) => {
    const prepSlug = data.game.split(' ').join('_').split(`'`).join('');
    return (
        <Wrapper darkMode={darkMode} onClick={handleClick}>
            <ItemWrapper>
                <Anchor url={`/game/${prepSlug}`} noLine>
                    <CoverImage name={data.game} />
                </Anchor>
                <TextContent>
                    <GenreTag genre={data.genre.split(' ').join('_')}>{data.genre}</GenreTag>
                    <Anchor url={`/game/${prepSlug}`} noLine>
                        <Header>
                            <Span>{data.publisher}</Span>
                            {data.game}
                        </Header>
                    </Anchor>
                </TextContent>
            </ItemWrapper>
            <Rank>
                {data.current_rank}
            </Rank>
        </Wrapper>
    );
};

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(SearchItem);

const Wrapper = styled.div<{ darkMode: DarkMode; }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ darkMode }) => darkMode ? theme.colors.white : theme.colors.lightBlack};
    padding: 2rem 0;
`;

const Rank = styled.div`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    background-color: ${theme.colors.green};
    color: ${theme.colors.white};
    font-weight: 700;

    @media screen and (max-width: ${theme.mediaQueries.width.s}){
        display: none;
    }
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    @media screen and (max-width: ${theme.mediaQueries.width.s}){
        > div > a {
            display: none;
        }
    }
`;

const TextContent = styled.div`
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
`;

const Span = styled.span`
    color: ${theme.colors.green};
    font-size: 0.6rem;
    text-transform: uppercase;
    font-weight: 700;
    display: block;
    margin-bottom: 5px;
    text-align: left;
`;