import * as React from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { AppState } from "redux-state";
import { DarkMode } from "redux-state/darkmode/types";
import theme from "constants/theme";

type VariantType = "Large" | "Big" | "Default" | "Medium" | "Small" | "Tiny";

interface Props extends React.HTMLAttributes<{}> {
  variant?: VariantType;
  as?: keyof JSX.IntrinsicElements;
  darkMode: DarkMode;
}

const elementMap: { [k in VariantType]: keyof JSX.IntrinsicElements } = {
  Large: "h1",
  Big: "h2",
  Default: "h3",
  Medium: "h4",
  Small: "h5",
  Tiny: "h6"
};

const Large = css`
  font-size: 2.8rem;
  font-weight: 700;
`;

const Big = css`
  font-size: 2.4rem;
  font-weight: 500;
`;

const Default = css``;

const Medium = css``;

const Small = css``;

const Tiny = css``;

const MainTitle = styled.h1<Props>`
  color: ${({ darkMode }) => darkMode ? theme.colors.white : theme.colors.black }
  ${({ variant = "Default" }) => {
    switch (variant) {
      case "Large":
        return Large;
      case "Big":
        return Big;
      case "Medium":
        return Medium;
      case "Small":
        return Small;
      case "Tiny":
        return Tiny;
      default:
        return Default;
    }
  }}
`;

const Header: React.FC<Props> = ({
  variant = "Default",
  as = elementMap[variant],
  children,
  darkMode,
  ...rest
}) => {
  return (
    <MainTitle variant={variant} darkMode={darkMode} as={as} {...rest}>
      {children}
    </MainTitle>
  );
};

export default connect(
  ({ darkMode }: AppState) => ({ darkMode })
)(Header);
