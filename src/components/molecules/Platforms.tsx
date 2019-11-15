import React from 'react';
import { IReleases } from 'entities/GameData';
import Header from 'components/atoms/Header';
import Paragraph from 'components/atoms/Paragraph';

interface Props {
    release_dates: IReleases[];
}

const Platforms: React.FC<Props> = ({ release_dates }) => {
    const platformArray = release_dates.map(entry => entry.platforms);
    const platformString = platformArray.join(', ');

    return (
        <>
            <Header variant="Default">Platforms</Header>
            <Paragraph>{platformString}</Paragraph>
        </>
    )
}

export default Platforms;