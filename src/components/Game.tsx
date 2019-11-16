import React from 'react';
import ContentWrapper from './molecules/ContentWrapper';
import Spinner from './atoms/Spinner';
import createUrl from 'utils/createUrl';
import useFetch from '@codecolde/use-fetch';
import authenticationHeader from 'constants/authenticationHeader';
import NotFound from './organisms/NotFound';
import GameDetails from './organisms/GameDetails';
import { useParams } from 'react-router';

const Game: React.FC = () => {
  const { game } = useParams();

  const Url = createUrl("https://api.newzoo.com/v1.0/metadata/game/search", {
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

  return (
    <ContentWrapper>
      {game ?
        loading
          ? <Spinner />
          : data && data[0]
            ? <GameDetails data={data[0]} />
            : <NotFound />
        : <NotFound />
      }
    </ContentWrapper>
  );
}

export default Game;