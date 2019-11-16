import React from 'react';
import ContentWrapper from 'components/molecules/ContentWrapper';
import Spinner from 'components/atoms/Spinner';
import GameDetails from 'components/organisms/GameDetails';
import createUrl from '../utils/createUrl';
import authenticationHeader from 'constants/authenticationHeader';
import { IData } from 'entities/GameData';
import Header from 'components/atoms/Header';

interface IMatch {
    isExact: boolean;
    url: string;
    path: string;
    params: {
        game: string;
    }
}
interface Props {
    match: IMatch;
}

interface State {
    loadingId: boolean;
    loadingGame: boolean;
    gameId?: string;
    gameData?: IData;
    error: string;
}

class GameClass extends React.Component<Props, State>{
    state = {
        loadingId: true,
        loadingGame: true,
        gameId: undefined,
        gameData: undefined,
        error: ''
    };

    getId = async (gameTitle: string) => {
        const localData = localStorage.getItem(gameTitle);
        if (localData && this.state.loadingId) {
            const parsedLocalData = JSON.parse(localData);
            this.setState({
                loadingId: false,
                gameId: parsedLocalData[0].id,
                loadingGame: true,
                gameData: undefined
            });
        } else {
            try {
                const Url = createUrl("https://api.newzoo.com/v1.0/metadata/noun/search", {
                    nouns: ['game', 'genre', 'country'],
                    include_aliases: true,
                    search_text: gameTitle
                });
                const response = await fetch(Url.toString(), {
                    method: 'POST',
                    headers: authenticationHeader
                });
                const json = await response.json();
                localStorage.setItem(gameTitle, JSON.stringify(json));
                if (json) {
                    this.setState({
                        loadingId: false,
                        gameId: json[0].id
                    });
                }
            } catch (error) {
                this.setState({
                    loadingId: false,
                    error
                });
            }
        }
    }

    fetchGameData = async (gameTitle: string) => {
        if ( this.state.loadingGame && this.state.gameId) {
            const localData = localStorage.getItem(`${gameTitle}_data`);

            if (localData) {
                const parsedLocalData = JSON.parse(localData);
                this.setState({
                    loadingGame: false,
                    gameData: parsedLocalData
                });
            } else {
                try {
                    const response = await fetch(
                        `https://api.newzoo.com/v1.0/metadata/game/${this.state.gameId}`,
                        { headers: authenticationHeader }
                    );
                    const json = await response.json();
                    if (!json.id) {
                        this.setState({
                            error: 'No data found. Try refreshing?'
                        });
                    } else {
                        localStorage.setItem(`${gameTitle}_data`, JSON.stringify(json));
                        this.setState({
                            loadingGame: false,
                            gameData: json
                        });
                    }
                } catch (error) {
                    this.setState({
                        loadingId: false,
                        error
                    });
                }
            }
        }
    }

    async componentDidMount () {
        this.getId(this.props.match && this.props.match.params && this.props.match.params.game);
    }

    async componentDidUpdate (prevProps: Props) {
        // New Game page via the search bar doesn't proc a remount, so... here it is
        if (this.props.match.params.game !== prevProps.match.params.game) {
            this.setState({
                loadingId: true,
                gameId: undefined,
                loadingGame: true,
                gameData: undefined
            });
        }

        // Response to the above state reset
        if (this.state.loadingId) {
            this.getId(this.props.match && this.props.match.params && this.props.match.params.game);
        }

        // After ID received, fetch data, store in localStorage if it wasn't there before
        if (!this.state.loadingId && this.state.loadingGame) {
            const gameTitle = this.props.match.params.game;
            this.fetchGameData(gameTitle);
        }
    }

    render() {
        const { loadingId, loadingGame, gameData, error } = this.state;
        const loading = !!loadingId && !!loadingGame;

        return (
            <ContentWrapper>
                {loading
                    ? <Spinner />
                    : error
                        ? <Header>{error}</Header>
                        : gameData && !error && <GameDetails data={gameData} />
                }
            </ContentWrapper>
        );
    }
}

export default GameClass;