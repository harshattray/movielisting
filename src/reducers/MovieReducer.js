/**
 * @Author: harsha
 * @Date:   2020-08-25T12:11:09+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T12:11:22+02:00
 */

const initialState = {
  Processing: false,
  Message: null,

  Generes: [],
  Languages: [],
  ProductionCompanies: [],

  List: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GETTING_MOVIE':
      return {...state, Processing: true};

    case 'GET_MOVIE_DATA':
      return {
        ...state,
        Generes: action.payload.Generes,
        Languages: action.payload.Languages,
        ProductionCompanies: action.payload.ProductionCompanies,
        List: [...state.List, ...action.payload.SimilarMovies.results],
        Processing: false,
        Message: 'Done',
      };

    case 'GETTING_MOVIE_FAILED':
      return {...state, Processing: false, Message: 'Failed'};

    case 'EMPTY_MOVIE_DATA':
      return {
        ...state,
        Processing: false,
        Message: null,
        Page: 0,
        List: [],
        TotalPages: null,
        MovieDetails: null,
      };

    default:
      return state;
  }
};
