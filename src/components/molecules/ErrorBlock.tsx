import React from 'react';
import styled from 'styled-components';
import Header from 'components/atoms/Header';

interface Props {
    data: {
        isError: boolean;
        code: number;
        message?: string;
        body?: any;
    }
}

const ErrorBlock: React.FC<Props> = ({ data }) => {
    return (
        <Wrapper>
            {data && data.isError
                ? <>
                    <Header variant="Large">{data.code}</Header>
                    <Header variant="Medium">{data.message ? data.message : data.body.message}</Header>
                </> : <Header variant="Large">Error</Header>
            }
        </Wrapper>
    )
}

export default ErrorBlock;

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;