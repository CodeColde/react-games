import React from 'react';
import useFetch from "@codecolde/use-fetch";
import MainWrapper from './molecules/MainWrapper';
import Spinner from './atoms/Spinner';
import GameList from './organisms/GameList';

const Home: React.FC = () => {
  const [imagePrep, setImagePrep] = React.useState(true);
  const token = process.env.REACT_APP_CLIENT_TOKEN || '';
  const url = new URL("https://api.newzoo.com/v1.0/viewership/table_rankings");
  const queryParams = {
    start_date: '2019-09-01',
    end_date: '2019-09-30',
    comp_start_date: '2019-08-01',
    comp_end_date: '2019-08-31',
    limit: 50,
    permission_set: 'Game Rankings'
  };
  Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
  /* 50 Games */
  const [loading, data] = useFetch(
    url,
    {
      headers: {
        'Content-Type': 'json',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': token
      },
    },
    "allGames",
    "local"
  );

  if (!loading) {
    setTimeout(() => {
      setImagePrep(false);
    }, 1000);
  }

  return (
    <MainWrapper>
      {(loading && imagePrep)
        ? <Spinner />
        : <>
            {imagePrep && <Spinner />}
            <GameList data={data} preparingImages={imagePrep} />
          </>
      }
    </MainWrapper>
  );
}

export default Home;