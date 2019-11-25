import React from 'react';
import useFetch from "@codecolde/use-fetch";
import MainWrapper from './molecules/MainWrapper';
import Spinner from './atoms/Spinner';
import GameList from './organisms/GameList';
import authenticationHeader from 'constants/authenticationHeader';
import createUrl from 'utils/createUrl';
import ErrorBlock from './molecules/ErrorBlock';

const Home: React.FC = () => {
  const [imagePrep, setImagePrep] = React.useState(true);

  const Url = createUrl(
    "https://api.newzoo.com/v1.0/viewership/table_rankings",
    {
      comp_start_date: '2019-09-01',
      comp_end_date: '2019-09-30',
      start_date: '2019-10-01',
      end_date: '2019-10-31',
      platforms: ['YouTube','Twitch'],
      limit: 51,
      __permission_set: "Game Rankings"
    }
  );

  const [loading, data] = useFetch(Url, { headers: authenticationHeader }, "allGames", "local");

  if (!loading) {
    setTimeout(() => {
      setImagePrep(false);
    }, 1000);
  }

  return (
    <MainWrapper>
      {(loading && imagePrep)
        ? <Spinner />
        : data.isError
          ? <ErrorBlock data={data} />
          : <>
              {imagePrep && <Spinner />}
              <GameList data={data} preparingImages={imagePrep} />
            </>
      }
    </MainWrapper>
  );
}

export default Home;