import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../redux-state";
import { Users } from "../redux-state/users/types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import theme from "../constants/theme";
import EntryWrapper from "./molecules/EntryWrapper";
import TextInput from "./atoms/TextInput";
import Submit from "./atoms/Submit";
import Anchor from "./atoms/Anchor";
import Header from "./atoms/Header";
import Paragraph from "./atoms/Paragraph";
import { loginAction } from "redux-state/login/actions";
import { LoginAction } from "redux-state/login/types";

interface Props extends RouteComponentProps<any> {
    users: Users;
    loginAction: LoginAction;
}

const Login: React.FC<Props> = ({ users, loginAction, history }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please fill in all details");
            return;
        }
        const user = users.find(user => user.username === username);
        if (!user) {
            setError("This user does not exist");
            return;
        }
        if (user && user.password !== password) {
            setError("Incorrect Password, please try again");
            return;
        }
        await loginAction(user);
        await history.push("/browse/");
    };

    return (
        <EntryWrapper>
            <Title variant="Large">Login</Title>
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
            <Submit onClick={handleLogin}>Login</Submit>
            <Paragraph>or</Paragraph>
            <Anchor url="/register/">Register</Anchor>
        </EntryWrapper>
    );
};

const mapStateToProps = ({ users }: AppState) => ({
    users
});

export default withRouter(
    connect(
        mapStateToProps,
        { loginAction }
    )(Login)
);

const Title = styled(Header)`
    text-align: center;
`;

const Error = styled(Header)`
    height: 1rem;
    color: ${theme.colors.red};
`;