import React from 'react';
import styled from 'styled-components';
import Anchor from 'components/atoms/Anchor';
import CoverImage from 'components/atoms/CoverImage';
import Header from 'components/atoms/Header';
import GenreTag from 'components/molecules/GenreTag';
import theme from 'constants/theme';

export interface IGameListItem {
    game: string;
    genre: string;
    publisher: string;
    hours_viewed: number;
    current_rank: number;
    previous_rank: number;
}

interface Props {
    game: IGameListItem;
}

const GameListItem: React.FC<Props> = ({ game }) => {
    const prepSlug = game.game.split(' ').join('_');
    const prepGenre = game.genre && game.genre.split(' ').join('_');
    return (
        <Wrapper>
            <Anchor url={`/game/${prepSlug}`} noLine>
                <CoverImage name={game.game} />
            </Anchor>
            <GenreTag
                genre={game.genre && prepGenre}
            >
                {game.genre ? game.genre : 'No Genre'}
            </GenreTag>
            <Anchor url={`/game/${prepSlug}`} noLine>
                <Header>
                    <Span>{game.publisher}</Span>
                    {game.game}
                </Header>
            </Anchor>
        </Wrapper>
    )
}

export default GameListItem;

const Wrapper = styled.div`
    word-wrap: break-word;
    margin: 0 1rem;
    max-width: 272px;
    padding-bottom: 1rem;
`;

const Span = styled.span`
    color: ${theme.colors.green};
    font-size: 0.6rem;
    text-transform: uppercase;
    font-weight: 700;
    display: block;
    margin-bottom: 5px;
`;