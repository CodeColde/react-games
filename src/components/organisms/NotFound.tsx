import React from 'react';
import Header from 'components/atoms/Header';
import styled from 'styled-components';
import Anchor from 'components/atoms/Anchor';

const NotFound = () => {
    return (
        <Wrapper>
            <Header variant="Large">Oops, that didn't exist!</Header>
            <Anchor url="/">Back to browse...</Anchor>
        </Wrapper>
    )
}

export default NotFound;

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;