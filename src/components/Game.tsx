import React from 'react';
import ContentWrapper from './molecules/ContentWrapper';
import Spinner from './atoms/Spinner';
import GameDetails from './organisms/GameDetails';
import createUrl from 'utils/createUrl';
import useFetch from '@codecolde/use-fetch';
import authenticationHeader from 'constants/authenticationHeader';
import NotFound from './organisms/NotFound';
import usePrevious from 'utils/usePrevious';

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

const Game: React.FC<Props> = ({ match }) => {
  const game = match && match.params && match.params.game;
  const prevGame = usePrevious({ game });

  const Url = createUrl("https://api.newzoo.com/v1.0/metadata/noun/search", {
      nouns: ['game', 'genre', 'country'],
      include_aliases: true,
      search_text: game
  });

  const [loading, data] = useFetch(
      Url, {
        method: "POST",
        headers: authenticationHeader
      }, game, "local"
  );

  const [loadGame, gameData] = useFetch(
    `https://api.newzoo.com/v1.0/metadata/game/${data && data[0] && data[0].id}`,
    { headers: authenticationHeader },
    `${game}_data`,
    "local",
    data && data[0] && data[0].id
  );

  React.useEffect(() => {
    if(prevGame && prevGame.game !== game){
      console.log('new game');
    }
  }, [game, prevGame]);

  const isLoading = !!loading && !!loadGame;

  return (
    <ContentWrapper>
      {game ?
        isLoading
          ? <Spinner />
          : gameData
            ? <GameDetails data={gameData} />
            : <NotFound />
        : <NotFound />
      }
    </ContentWrapper>
  );
}

export default Game;