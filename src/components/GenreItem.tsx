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
import NotFound from './organisms/NotFound';
import createUrl from 'utils/createUrl';
import authenticationHeader from 'constants/authenticationHeader';

const GenreItem: React.FC = () => {
    const { genre } = useParams();

    const Url = createUrl("https://api.newzoo.com/v1.0/metadata/genre/search", {
        nouns: ['genre'],
        search_text: genre,
    });
    const [loading, data] = useFetch(Url, {
        method: "POST",
        headers: authenticationHeader
    }, genre, "local");

    return (
        <ContentWrapper>
            {loading
            ? <Spinner />
            : (data && data.length > 0)
                ? data.map((entry: IGenreInfo) =>
                    (entry && entry.id)
                    ? (
                        <Fragment key={entry.id}>
                            {entry.name && <GenreTitle variant="Large">{entry.name}</GenreTitle>}
                            {entry.alternate_names && <Span>{entry.alternate_names.join(' - ')}</Span>}
                            {entry.description && <Paragraph>{entry.description}</Paragraph>}
                            {entry.media_files && <MediaSlideshow mediaArray={entry.media_files} />}
                        </Fragment>
                    ) : <NotFound />
                ) : <NotFound />
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