/**
 * @Author: harsha
 * @Date:   2020-08-25T16:17:52+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T17:23:06+02:00
 */

import moxios from 'moxios';
import {testStore} from '../src/helpers/utils';
import {ListAllMovies} from '../src/actions/ListMoviesAction';

describe('ListAllMovies', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('store is updated correctly', () => {
    const expectedState = [
      {
        adult: false,
        backdrop_path: '/fFdOJxmG2U7IYYlkFKtDk1nGPhF.jpg',
        genre_ids: [35, 18, 10751],
        id: 508570,
        media_type: 'movie',
        original_language: 'en',
        original_title: 'The One and Only Ivan',
        overview:
          'Ivan is a 400-pound silverback gorilla who shares a communal habitat in a suburban shopping mall with Stella the elephant, Bob the dog, and various other animals. He has few memories of the jungle where he was captured, but when a baby elephant named Ruby arrives, it touches something deep within him. Ruby is recently separated from her family in the wild, which causes him to question his life, where he comes from and where he ultimately wants to be.',
        popularity: 168.785,
        poster_path: '/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg',
        release_date: '2020-08-21',
        title: 'The One and Only Ivan',
        video: false,
        vote_average: 7.4,
        vote_count: 42,
      },
    ];
    const store = testStore();
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: expectedState,
      });
    });
    return store.dispatch(ListAllMovies()).then(() => {
      const newState = store.getState();
      console.log(newState, 'newState');
      expect(newState.ListMoviesReducer.List).toBe(expectedState);
    });
  });
});
