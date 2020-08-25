/**
 * @Author: harsha
 * @Date:   2020-08-25T16:17:52+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T16:33:28+02:00
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
    const expectedState = [];
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
