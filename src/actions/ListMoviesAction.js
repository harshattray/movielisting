/**
 * @Author: harsha
 * @Date:   2020-08-25T12:18:45+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T14:57:31+02:00
 */

import axios from 'axios';
import {apiKey} from '../actions/index';

const APIs = [
  // Trending 0
  'https://api.themoviedb.org/3/trending/movie/week',
  // Popular 1
  'https://api.themoviedb.org/3/movie/popular',
  // Upcoming 2
  'https://api.themoviedb.org/3/movie/upcoming',
  // InTheaters 3
  'https://api.themoviedb.org/3/movie/now_playing',
  // YearTopMovies 4
  'http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&primary_release_year=' +
    new Date().getFullYear().toString(),
  // TopRatedMovies 5
  'https://api.themoviedb.org/3/movie/top_rated',
  // TopAnimation 6
  'http://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc',
];

/**
 * [ListAllMovies description]
 * @param {[type]} api [description]
 */

export const ListAllMovies = (api) => {
  return async (dispatch, getState) => {
    dispatch({type: 'GETTING_LIST'});
    const state = getState();
    var Page = state.ListMoviesReducer.Page + 1;
    try {
      axios
        .get(APIs[api], {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: Page,
            region: 'US',
          },
        })
        .then(function (response) {
          dispatch({type: 'GET_LIST_DATA', payload: {data: response.data}});
          console.log(response.data);
        })
        .catch(function (error) {
          dispatch({type: 'GETTING_LIST_FAILED'});
        });
    } catch (err) {
      dispatch({type: 'GETTING_LIST_FAILED'});
    }
  };
};

/**
 * [EmptyListData description]
 */

export const EmptyListData = () => {
  return (dispatch) => {
    dispatch({type: 'EMPTY_LIST_DATA'});
  };
};
