import React from 'react';
import styled from 'styled-components';
import theme from 'constants/theme';
import { connect } from 'react-redux';
import { DarkMode } from 'redux-state/darkmode/types';
import { AppState } from 'redux-state';

type VariantType = "large" | "default" | "thin" | "small";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    url: string;
    noLine?: boolean;
    variant?: VariantType;
    darkMode: DarkMode;
}

const ExternalLink: React.FC<Props> = ({ variant = "default", url, children, noLine, darkMode }) => {
    return (
        <Construct
            darkMode={darkMode}
            noLine={noLine}
            variant={variant}
        >
            <Tag
                href={url}
                target="_blank"
            >
                {children}
            </Tag>
        </Construct>
    );
}

export default connect(
    ({ darkMode }: AppState) => ({ darkMode })
)(ExternalLink);

const Construct = styled.div<{ noLine?: boolean; variant: VariantType; darkMode: DarkMode; }>`
    font-size: 1rem;
    display: inline;
    font-weight: 500;
    color: ${({ darkMode }) => darkMode ? theme.colors.lightBlue : theme.colors.blue};
    padding-bottom: 2px;
    ${({ noLine, darkMode }) =>
        !noLine && `border-bottom: 1px solid ${
            darkMode
            ? theme.colors.lightBlue
            : theme.colors.blue
        };`
    }
`;

const Tag = styled.a`
    color: inherit;
    text-decoration: none;
`;