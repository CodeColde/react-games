import React from 'react';
import ContentWrapper from './molecules/ContentWrapper';
import Spinner from './atoms/Spinner';
import GameDetails from './organisms/GameDetails';
import createUrl from 'utils/createUrl';
import useFetch from '@codecolde/use-fetch';
import authenticationHeader from 'constants/authenticationHeader';
import NotFound from './organisms/NotFound';

interface SearchResults {
  id: string;
  type: "game";
  name: string;
}

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
  const [game, setGame] = React.useState(match && match.params && match.params.game)

  const [isLoading, setLoading] = React.useState(true);

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
    if (!loading && !loadGame) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
    } else {
        setLoading(true);
    }
    setGame(match.params.game);
  }, [loading, loadGame, match]);

  return (
    <ContentWrapper>
      {game ?
        isLoading
          ? <Spinner />
          : (data && data.length > 0)
            ? data.map((entry: SearchResults) => (
              <GameDetails data={gameData} key={entry.id} />
            ))
            : <NotFound />
        : <NotFound />
      }
    </ContentWrapper>
  );
}

export default Game;