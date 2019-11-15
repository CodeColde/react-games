import React from 'react';
import useFetch from '@codecolde/use-fetch';
import Spinner from './atoms/Spinner';
import { IGenreInfo } from 'entities/GenreDetails';
import MainWrapper from './molecules/MainWrapper';
import Anchor from './atoms/Anchor';
import styled from 'styled-components';
import Header from './atoms/Header';
import theme from 'constants/theme';
import FilterTitle from './molecules/FilterTitle';

const Genre = () => {
    const [sortBy, setSortBy] = React.useState('alphabetical');
    const [asc, setAsc] = React.useState(true);

    const token = process.env.REACT_APP_CLIENT_TOKEN || '';
    const [loading, data] = useFetch(
        "https://api.newzoo.com/v1.0/metadata/genre/search",
        {
            method: "POST",
            cache: "reload",
            headers: {
                'Content-Type': 'json',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': token
            }
        },
        "allGenres",
        "local"
    );

    const sortedData = data && data.sort((prev: IGenreInfo, curr: IGenreInfo) => {
        switch(sortBy) {
            case 'alphabetical':
                return curr.name < prev.name ? 1 : -1;
            case 'random':
                return Math.round(Math.random() * 10) >= 5 ? 1 : -1;
            default:
                return 1;
        }
    });

    const ascDescData = asc ? sortedData : sortedData.reverse();

    return (
        <MainWrapper>
            {loading
                ? <Spinner />
                : <>
                    <FilterTitle
                        sortOptions={['alphabetical', 'random']}
                        setting={sortBy}
                        setSortBy={setSortBy}
                        order={asc}
                        setAsc={setAsc}
                    >
                        genres
                    </FilterTitle>
                    <Wrapper>
                        {ascDescData.map((entry: IGenreInfo) => {
                            const url = `/genre/${entry.name.split(' ').join('_')}`;
                            const image = entry.media_files.find((elem) => elem.type === "image");
                            return (
                                <Container key={entry.id}>
                                    <Anchor url={url} noLine>
                                        <Image
                                            src={image
                                                ? image.url
                                                : 'https://api-test.newzoo.com:443/v1.0/metadata/game/boxart?name=notexist'
                                            }
                                        />
                                    </Anchor>
                                    <Anchor url={url} noLine>
                                        <Header>{entry.name}</Header>
                                    </Anchor>
                                </Container>
                            );
                        })}
                    </Wrapper>
                </>
            }
        </MainWrapper>
    );
};

export default Genre;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        flex-direction: column;
        justify-content: center;
    }
`;

const Container = styled.div`
    padding: 2rem;
    height: 16rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
    }
`;

const Image = styled.img`
    max-width: 300px;
`;