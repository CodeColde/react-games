import React from 'react';
import CoverImage from 'components/atoms/CoverImage';
import ReleaseTeam from 'components/molecules/ReleaseTeam';
import Platforms from 'components/molecules/Platforms';
import { IPublisher, IIdName, IReleases } from 'entities/GameData';
import styled from 'styled-components';
import theme from 'constants/theme';

interface Props {
    coverImage: string;
    publishers: IPublisher[];
    developers: IIdName[];
    releaseDates: IReleases[];
}

const CoverDetails: React.FC<Props> = ({ coverImage, publishers, developers, releaseDates }) => {
    return (
        <Wrapper>
            <CoverImage name={coverImage} />
            <TextWrapper>
                <ReleaseTeam
                    publishers={publishers}
                    developers={developers}
                />
                <Platforms
                    release_dates={releaseDates}
                />
            </TextWrapper>
        </Wrapper>
    );
};

export default CoverDetails;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 35rem;

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
    }
`;

const TextWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding-left: 3rem;

    @media screen and (max-width: ${theme.mediaQueries.width.m}) {
        padding-left: 3rem;
    }
    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        padding-left: 0;
    }
`;