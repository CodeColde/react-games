import React from 'react';
import useFetch from "@codecolde/use-fetch";
import MainWrapper from './molecules/MainWrapper';
import Spinner from './atoms/Spinner';
import GameList from './organisms/GameList';
import authenticationHeader from 'constants/authenticationHeader';
import createUrl from 'utils/createUrl';

const Home: React.FC = () => {
  const [imagePrep, setImagePrep] = React.useState(true);
  const Url = createUrl(
    "https://api.newzoo.com/v1.0/viewership/table_rankings",
    {
      start_date: '2019-09-01',
      end_date: '2019-09-30',
      comp_start_date: '2019-08-01',
      comp_end_date: '2019-08-31',
      limit: 51,
      permission_set: 'Game Rankings'
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
        : <>
            {imagePrep && <Spinner />}
            <GameList data={data} preparingImages={imagePrep} />
          </>
      }
    </MainWrapper>
  );
}

export default Home;