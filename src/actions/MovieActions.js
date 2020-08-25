/**
 * @Author: harsha
 * @Date:   2020-08-25T12:18:45+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T16:28:10+02:00
 */

import axios from 'axios';
import {apiKey} from '../actions/index';

const MovieDetails = (id) => {
  return axios.get('http://api.themoviedb.org/3/movie/' + id, {
    params: {
      api_key: apiKey,
    },
  });
};

export const SimilarMovies = (id) => {
  return axios.get('https://api.themoviedb.org/3/movie/' + id + '/similar', {
    params: {
      api_key: apiKey,
    },
  });
};

export const GetMovieData = (id) => {
  return async (dispatch) => {
    dispatch({type: 'GETTING_MOVIE'});
    try {
      axios.all([MovieDetails(id), SimilarMovies(id)]).then(
        axios.spread(
          //spoken_languages
          function (MovieDetails, SimilarMovies) {
            dispatch({
              type: 'GET_MOVIE_DATA',
              payload: {
                Generes: MovieDetails.data.genres,
                Languages: MovieDetails.data.spoken_languages,
                ProductionCompanies: MovieDetails.data.production_companies,
                SimilarMovies: SimilarMovies.data,
              },
            });
          },
        ),
      );
    } catch (error) {
      dispatch({type: 'GETTING_MOVIE_FAILED'});
    }
  };
};

export const EmptyMovieData = () => {
  return (dispatch) => {
    dispatch({type: 'EMPTY_MOVIE_DATA'});
  };
};
