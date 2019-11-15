import React from 'react';
import styled from 'styled-components';

interface Props {
    name: string;
}

const CoverImage: React.FC<Props> = ({ name }) => {
    // https://api-test.newzoo.com:443/v1.0/metadata/game/boxart?name=Mobile Legends: Bang bang
    // https://api-test.newzoo.com:443/v1.0/metadata/game/boxart?name=Mobile Legends: Bang Bang
    return (
        <Image
            src={`https://api-test.newzoo.com:443/v1.0/metadata/game/boxart?name=${name}`}
            alt={name}
        />
    );
};

export default CoverImage;

const Image = styled.img`
    max-width: 272px;
    margin-bottom: 1rem;
`;