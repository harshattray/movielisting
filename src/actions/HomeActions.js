/**
 * @Author: harsha
 * @Date:   2020-08-25T12:18:45+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T15:15:21+02:00
 */

import axios from 'axios';
import {apiKey} from './index';

const Trending = () => {
  return axios.get('https://api.themoviedb.org/3/trending/movie/week', {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'US',
    },
  });
};

const Popular = () => {
  return axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'US',
    },
  });
};

const Upcoming = () => {
  return axios.get('https://api.themoviedb.org/3/movie/upcoming', {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'US',
    },
  });
};

const InTheaters = () => {
  return axios.get('https://api.themoviedb.org/3/movie/now_playing', {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'US',
    },
  });
};

const YearTopMovies = () => {
  return axios.get('http://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'US',
      primary_release_year: new Date().getFullYear(),
      sort_by: 'vote_average.desc',
    },
  });
};

const TopRatedMovies = () => {
  return axios.get('https://api.themoviedb.org/3/movie/top_rated', {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'US',
    },
  });
};

const TopAnimation = () => {
  return axios.get('http://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'US',
      certification_country: 'US',
      'certification.lte': 'G',
      sort_by: 'popularity.desc',
    },
  });
};

export const GetAllData = () => {
  return async (dispatch) => {
    console.log('enter');
    dispatch({type: 'GETTING_DATA'});
    try {
      axios
        .all([
          Trending(),
          Popular(),
          Upcoming(),
          InTheaters(),
          YearTopMovies(),
          TopRatedMovies(),
          TopAnimation(),
        ])
        .then(
          axios.spread(function (
            Trending,
            Popular,
            Upcoming,
            InTheaters,
            YearTopMovies,
            TopRatedMovies,
            TopAnimation,
          ) {
            dispatch({
              type: 'GET_ALL_DATA',
              payload: {
                Trending: Trending.data.results.slice(0, 5),
                Popular: Popular.data.results.slice(0, 5),
                Upcoming: Upcoming.data.results.slice(0, 5),
                InTheaters: InTheaters.data.results.slice(0, 5),
                YearTopMovies: YearTopMovies.data.results.slice(0, 5),
                TopRatedMovies: TopRatedMovies.data.results.slice(0, 5),
                TopAnimation: TopAnimation.data.results.slice(0, 5),
              },
            });
          }),
        );
    } catch (error) {
      console.log('here');
      dispatch({type: 'GETTING_DATA_FAILED'});
    }
  };
};
