/**
 * @Author: harsha
 * @Date:   2020-08-25T12:11:09+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T12:11:30+02:00
 */

import {combineReducers} from 'redux';

import HomeReducer from './HomeReducer';
import ListMoviesReducer from './ListMoviesReducer';
import MovieReducer from './MovieReducer';

export default combineReducers({
  HomeReducer: HomeReducer,
  ListMoviesReducer: ListMoviesReducer,
  MovieReducer: MovieReducer,
});
