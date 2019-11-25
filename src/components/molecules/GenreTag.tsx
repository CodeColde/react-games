import React from 'react';
import styled from 'styled-components';
import theme from 'constants/theme';
import Anchor from 'components/atoms/Anchor';

interface Props {
    genre: string | null;
}

const GenreTag: React.FC<Props> = ({ genre, children }) => {
    return genre !== null
        ? (
            <Anchor url={genre !== null ? `/genre/${genre}` : ''} noLine>
                <Tag>{children}</Tag>
            </Anchor>
        ) : <Tag>{children}</Tag>
}

export default GenreTag;

const Tag = styled.p`
    color: ${theme.colors.green};
    border: 1px solid ${theme.colors.green};
    padding: 0.5rem;
    display: inline-block;
    margin:0 0.5rem 0 0;
`;