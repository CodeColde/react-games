import React from 'react';
import { IPublisher, IIdName } from 'entities/GameData';
import Header from 'components/atoms/Header';
import Paragraph from 'components/atoms/Paragraph';

interface Props {
    publishers: IPublisher[];
    developers: IIdName[];
}

const ReleaseTeam: React.FC<Props> = ({ publishers, developers}) => {
    const sortedPublishers = publishers.sort((prev, curr) => {
        if (curr.is_main) return 1;
        return curr.name > prev.name ? -1 : 1;
    });
    const publisherNames = sortedPublishers.map(developer => developer.name);
    const publisherString = publisherNames.join(', ');

    const sortedDevelopers = developers.sort((prev, curr) => (
        curr.name > prev.name ? -1 : 1
    ));
    const developersName = sortedDevelopers.map(developer => developer.name);
    const developersString = developersName.join(', ');

    return (
        <>
            <Header>Publishers</Header>
            <Paragraph>{publisherString ? publisherString : 'Not listed'}</Paragraph>
            <Header>Developers</Header>
            <Paragraph>{developersString ? developersString : 'Not listed'}</Paragraph>
        </>
    )
}

export default ReleaseTeam;