import React from 'react';
import useFetch from '@codecolde/use-fetch';
import Spinner from 'components/atoms/Spinner';
import styled from 'styled-components';
import { IMainProbability, IRankFields, IAlternateNames } from 'entities/GameData';
import MediaSlideshow from './MediaSlideshow';
import Header from 'components/atoms/Header';
import GenreTag from 'components/molecules/GenreTag';
import CoverDetails from './CoverDetails';
import Paragraph from 'components/atoms/Paragraph';

interface Props {
    gameData?: string;
    id: string;
}
const GameDetails: React.FC<Props> = ({ gameData, id }) => {
    const token = process.env.REACT_APP_CLIENT_TOKEN || '';
    const url = new URL(`https://api.newzoo.com/v1.0/metadata/game/${id}`);
    const queryParams = {
        __permission_set: "Explorer%20Games"
    }
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

    const [loading, data] = useFetch(
        url,
        {
            headers: {
                'Content-Type': 'json',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': token
            },
        },
        `${gameData}_data`,
        "local"
    );

    const franchiseString = data.franchise && data.franchise.length > 0 && data.franchise.map(
        (entry: IMainProbability) => entry.name
    ).join(' and ');

    return (
        <div>
            {loading
                ? <Spinner />
                : <Wrapper>
                    {data.genres.map((entry: IMainProbability ) => (
                        <GenreTag genre={entry.name}>
                            {entry.name}
                        </GenreTag>
                    ))}
                    <GameTitle variant="Large">{data.name}</GameTitle>
                    <CoverDetails
                        coverImage={data.name}
                        publishers={data.publishers}
                        developers={data.developers}
                        releaseDates={data.release_dates}
                    />
                    <Paragraph>{data.description}</Paragraph>
                    {data.alternate_names.length > 0 &&
                        <>
                            <h2>Entries in the {franchiseString} franchise</h2>
                            <ul>
                                {data.alternate_names.map((entry: IAlternateNames, i: number) => (
                                    <li>{entry.name}</li>
                                ))}
                            </ul>
                        </>
                    }
                    <Stats>
                        <h2>Statistics</h2>
                        <h3>Game Rank: {data.rank}</h3>
                        {data.rank_fields.map((entry: IRankFields, i: number) => (
                            <p key={i}>{entry.name} rank: {entry.rank}</p>
                        ))}
                    </Stats>
                    <MediaSlideshow mediaArray={data.media_files} />
                </Wrapper>
            }
        </div>
    );
};

export default GameDetails;

const GameTitle = styled(Header)`
    margin: 1rem 0;
`;

const Wrapper = styled.div`

`;

const Stats = styled.div`

`;