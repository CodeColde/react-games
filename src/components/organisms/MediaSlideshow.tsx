import React from 'react';
import { IMediaFiles } from 'entities/Generics';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from 'react-redux';
import { AppState } from 'redux-state';
import { DarkMode } from 'redux-state/darkmode/types';
import theme from 'constants/theme';

interface Props {
    mediaArray: IMediaFiles[];
    darkMode: DarkMode;
}

const MediaSlideshow: React.FC<Props> = ({ mediaArray, darkMode }) => {
    const settings = {
        accessibility: true,
        arrows: true,
        dots: true,
        draggable: true,
        centerMode: true,
        variableWidth: false,
        adaptiveHeight: false,
        swipe: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <Wrapper>
            <SliderContainer {...settings} darkMode={darkMode}>
                {mediaArray.map((media: IMediaFiles) => {
                    let url = media.url;
                    if (media.type === 'video') {
                        url = url.replace('watch?v=', 'embed/');
                    }
                    if (media.type === 'image') {
                        return (
                            <MediaContainer>
                                <Image src={url} alt={url} key={media.id} />
                            </MediaContainer>
                        );
                    }
                    if (media.type === 'video') {
                        return (
                            <MediaContainer>
                                <Video src={url} height="auto" width="auto" key={media.id} />
                            </MediaContainer>
                        );
                    }
                    return null;
                })}
            </SliderContainer>
        </Wrapper>
    );
};

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(MediaSlideshow);

const Wrapper = styled.div`
    text-align: center;
    position: relative;
    height: 20.5rem;
    margin-top: 5rem;
    max-width: 100rem;

    @media screen and (max-width: ${theme.mediaQueries.width.xl}) {
        height: 15rem;
    }

    @media screen and (max-width: ${theme.mediaQueries.width.l}) {
        height: 11rem;
    }

    @media screen and (max-width: ${theme.mediaQueries.width.m}) {
        height: 8rem;
    }

    @media screen and (max-width: ${theme.mediaQueries.width.s}) {
        height: 5rem;
    }
`;

const SliderContainer = styled(Slider)<{ darkMode: DarkMode; }>`
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    margin-top: 2rem;
    position: relative;

    .slick-slider {
        box-sizing: border-box;
    }
    .slick-list {
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    > div {
        height: 99%;
    }
    .slick-slide {
        float: left;
        height: 20.5rem;
        min-height: 1px;
        padding: 5px;
        display: block;

        @media screen and (max-width: ${theme.mediaQueries.width.xl}) {
            height: 15rem;
        }

        @media screen and (max-width: ${theme.mediaQueries.width.l}) {
            height: 11rem;
        }

        @media screen and (max-width: ${theme.mediaQueries.width.m}) {
            height: 8rem;
        }

        @media screen and (max-width: ${theme.mediaQueries.width.s}) {
            height: 5rem;
        }
    }
    .slick-slide div {
        height: 100%;
        box-sizing: border-box;
    }
    .slick-arrow {
        width: 25px;
        height: 25px;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }
    &:hover {
        .slick-arrow {
            opacity: 1;
        }
    }
    .slick-next {
        right: 2rem;
    }
    .slick-prev {
        left: 1.5rem;
        z-index: 2;
    }
    .slick-next:before, .slick-prev:before {
        font-size: 25px;
        color: ${theme.colors.lightWhite};
    }
    .slick-dots button:before {
        color: ${({ darkMode }) => darkMode ? theme.colors.lightWhite : theme.colors.black};
    }
    .slick-dots li.slick-active button:before {
        color: ${({ darkMode }) => darkMode ? theme.colors.lightWhite : theme.colors.black};
    }
`;



const Image = styled.img`
    display: inline-block;
    height: 100%;
    width: inherit;
    object-fit: contain;
`;

const MediaContainer = styled.div`
    height: 100%;
    box-sizing: border-box;
`;

const Video = styled.iframe`
    display: inline-block;
    border: 0;
    height: 100%;
    width: 100%;
`;