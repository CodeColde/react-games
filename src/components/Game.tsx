import React from 'react';
import useFetch from "@codecolde/use-fetch";
import { useParams } from 'react-router';
import Spinner from './atoms/Spinner';
import GameDetails from './organisms/GameDetails';
import ContentWrapper from './molecules/ContentWrapper';

interface SearchResults {
  id: string;
  type: "game";
  name: string;
}

const Game: React.FC = () => {
    const [imagePrep, setImagePrep] = React.useState(true);
    const token = process.env.REACT_APP_CLIENT_TOKEN || '';
    const { game } = useParams();

    const url = new URL("https://api.newzoo.com/v1.0/metadata/noun/search");
    const queryParams = {
        nouns: ['game', 'genre', 'country'],
        include_aliases: true,
        search_text: game
    };
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    const [loading, data] = useFetch(url,
        {
            method: "POST",
            cache: "reload",
            headers: {
                'Content-Type': 'json',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': token
            },
            body: JSON.stringify({
                nouns: ['game'],
                include_aliases: true,
                search_text: 'league_of_legends'
            })
        },
        game,
        "local"
    );

  if (!loading) {
    setTimeout(() => {
      setImagePrep(false);
    }, 1000);
  }

  return (
    <ContentWrapper>
      {(loading && imagePrep)
        ? <Spinner />
        : data && data.map((entry: SearchResults) => (
            <GameDetails id={entry.id} gameData={game} key={entry.id} />
        ))
      }
    </ContentWrapper>
  );
}

export default Game;