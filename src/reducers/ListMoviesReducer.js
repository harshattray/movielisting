/**
 * @Author: harsha
 * @Date:   2020-08-25T12:11:09+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T12:11:28+02:00
 */

const initialState = {
  Processing: false,
  Message: null,

  Page: 0,
  List: [],
  TotalPages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GETTING_LIST':
      return {...state, Processing: true};

    case 'GET_LIST_DATA':
      return {
        ...state,
        Page: action.payload.data.page,
        TotalPages: action.payload.data.total_pages,
        List: [...state.List, ...action.payload.data.results],
        Processing: false,
        Message: 'Done',
      };

    case 'GETTING_LIST_FAILED':
      return {...state, Processing: false, Message: 'Failed'};

    case 'EMPTY_LIST_DATA':
      return {
        ...state,
        Processing: false,
        Message: null,
        Page: 0,
        List: [],
        TotalPages: null,
      };

    default:
      return state;
  }
};
