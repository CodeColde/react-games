import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import Header from './atoms/Header';
import useFetch from '@codecolde/use-fetch';
import Spinner from './atoms/Spinner';
import { IGenreInfo } from 'entities/GenreDetails';
import Paragraph from './atoms/Paragraph';
import MediaSlideshow from './organisms/MediaSlideshow';
import ContentWrapper from './molecules/ContentWrapper';
import styled from 'styled-components';
import theme from 'constants/theme';

const GenreItem: React.FC = () => {
    const { genre } = useParams();

    const token = process.env.REACT_APP_CLIENT_TOKEN || '';
    const url = new URL("https://api.newzoo.com/v1.0/metadata/genre/search");
    const queryParams = {
        search_text: genre,
    };
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    const [loading, data] = useFetch(url,
        {
            method: "POST",
            cache: "reload",
            headers: {
                'Content-Type': 'json',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': token
            },
        },
        genre,
        "local"
    );

    return (
        <ContentWrapper>
            {loading
                ? <Spinner />
                : data.map((entry: IGenreInfo) => (
                    <Fragment key={entry.id}>
                        <GenreTitle variant="Large">{entry.name}</GenreTitle>
                        <Span>{entry.alternate_names.join(' - ')}</Span>
                        <Paragraph>{entry.description}</Paragraph>
                        <MediaSlideshow mediaArray={entry.media_files} />
                    </Fragment>
                ))
            }
        </ContentWrapper>
    )
}

export default GenreItem;

const GenreTitle = styled(Header)`
    margin-bottom: 0;
`;

const Span = styled.span`
    color: ${theme.colors.green};
    font-size: 0.6rem;
    text-transform: uppercase;
    font-weight: 700;
    display: block;
    margin-bottom: 1.5rem;
`;