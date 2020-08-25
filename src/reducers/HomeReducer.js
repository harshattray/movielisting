/**
 * @Author: harsha
 * @Date:   2020-08-25T12:11:09+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T12:12:23+02:00
 */

const initialState = {
  Processing: false,
  Message: null,

  Trending: [],
  Popular: [],
  Upcoming: [],
  InTheaters: [],
  YearTopMovies: [],
  TopRatedMovies: [],
  TopAnimation: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GETTING_DATA':
      return {...state, Processing: true};

    case 'GET_ALL_DATA':
      return {
        ...state,
        Trending: action.payload.Trending,
        Popular: action.payload.Popular,
        Upcoming: action.payload.Upcoming,
        InTheaters: action.payload.InTheaters,
        YearTopMovies: action.payload.YearTopMovies,
        TopRatedMovies: action.payload.TopRatedMovies,
        TopAnimation: action.payload.TopAnimation,
        Processing: false,
        Message: 'Done',
      };

    case 'GETTING_DATA_FAILED':
      return {...state, Processing: false, Message: 'Failed'};

    default:
      return state;
  }
};
