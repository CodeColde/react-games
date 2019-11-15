import * as React from "react";
import { connect } from "react-redux";
import { createUser } from "../redux-state/users/actions";
import { AppState } from "../redux-state";
import { Users, User } from "../redux-state/users/types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import theme from "../constants/theme";
import EntryWrapper from "./molecules/EntryWrapper";
import TextInput from "./atoms/TextInput";
import Submit from "./atoms/Submit";
import Anchor from "./atoms/Anchor";
import Header from "./atoms/Header";
import Paragraph from "./atoms/Paragraph";

interface Props extends RouteComponentProps<any> {
  users: Users;
  createUser: (data: User) => void;
}

const Register: React.FC<Props> = ({ users, createUser, history }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [error, setError] = React.useState("");

  const handleClick = () => {
    const userExists = users.find(user => user.username === username);
    if (!userExists) {
      createUser({ firstName, lastName, username, password });
      setError("");
      history.push("/");
    } else {
      setError(`Username "${username}" already exists!`);
    }
  };

  return (
    <EntryWrapper>
      <Title variant="Large">Register</Title>
      <TextInput
        value={firstName}
        placeholder="First Name"
        onChange={e => setFirstName(e.target.value)}
      />
      <TextInput
        value={lastName}
        placeholder="Last Name"
        onChange={e => setLastName(e.target.value)}
      />
      <TextInput
        value={username}
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <TextInput
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <Error variant="Small">{error}</Error>
      <Submit onClick={handleClick}>Register</Submit>
      <Paragraph>or</Paragraph>
      <Paragraph>
        <Anchor url="/">Login</Anchor>
      </Paragraph>
    </EntryWrapper>
  );
};

const mapStateToProps = ({ users }: AppState) => ({
  users
});

export default withRouter(
  connect(
    mapStateToProps,
    { createUser }
  )(Register)
);

const Title = styled(Header)`
  text-align: center;
`;

const Error = styled(Header)`
  height: 1rem;
  color: ${theme.colors.red};
`;