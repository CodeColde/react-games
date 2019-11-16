import React from 'react';
import Header from 'components/atoms/Header';
import { IAlternateNames, IMainProbability } from 'entities/GameData';

interface Props {
    franchise: IMainProbability[];
    alternate_names: IAlternateNames[];
}

const Franchise: React.FC<Props> = ({ franchise, alternate_names }) => {
    const franchiseString = franchise && franchise.length > 0 && franchise.map(
        entry => entry.name
    ).join(' and ');
    return (
        <>
            <Header variant="Big">Entries in the {franchiseString} franchise</Header>
            <ul>
                {alternate_names.map((entry, i) => (
                    <li key={i}>{entry.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Franchise;