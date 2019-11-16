import React from 'react';
import styled from 'styled-components';
import { IMainProbability, IRankFields } from 'entities/GameData';
import MediaSlideshow from './MediaSlideshow';
import Header from 'components/atoms/Header';
import GenreTag from 'components/molecules/GenreTag';
import CoverDetails from './CoverDetails';
import Paragraph from 'components/atoms/Paragraph';
import Franchise from 'components/molecules/Franchise';
import Spinner from 'components/atoms/Spinner';

interface Props {
    data: any;
}
const GameDetails: React.FC<Props> = ({ data }) => {

    return (
        data
        ? <>
            {data.genres.map((entry: IMainProbability ) => (
                <GenreTag key={entry.name} genre={entry.name.split(' ').join('_')}>
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
                <Franchise franchise={data.franchise} alternate_names={data.alternate_names} />
            }
            <Header variant="Big">Rank</Header>
            <Paragraph> Current rank: {data.rank}</Paragraph>
            {data.rank_fields.map((entry: IRankFields, i: number) => (
                <Paragraph key={i}>{entry.name} rank: {entry.rank}</Paragraph>
            ))}
            <MediaSlideshow mediaArray={data.media_files} />
        </>
        : <Spinner />
    );
};

export default GameDetails;

const GameTitle = styled(Header)`
    margin: 1rem 0 2rem;
`;