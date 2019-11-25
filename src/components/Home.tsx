import React from 'react';
import useFetch from "@codecolde/use-fetch";
import MainWrapper from './molecules/MainWrapper';
import Spinner from './atoms/Spinner';
import GameList from './organisms/GameList';
import authenticationHeader from 'constants/authenticationHeader';
import createUrl from 'utils/createUrl';

const Home: React.FC = () => {
  const [imagePrep, setImagePrep] = React.useState(true);
  // https://api.newzoo.com/v1.0/pc_player_usage/game/comparison_data?fields=rank,rank_change,title,publisher,genre,player_share,sessions_per_user_per_day,average_playtime_per_day,average_session_time&start_date=2019-10-01&end_date=2019-10-31&comp_start_date=2019-09-01&comp_end_date=2019-09-30&geo_type=global
  const Url = createUrl(
    "https://api.newzoo.com/v1.0/pc_player_usage/game/comparison_data",
    {
      fields: ['rank', 'title', 'publisher', 'genre'],
      start_date: '2019-10-01',
      end_date: '2019-10-31',
      comp_start_date: '2019-09-01',
      comp_end_date: '2019-09-30',
      geo_type: 'global',
      limit: 51,
      __permission_set: 'Game Rankings'
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