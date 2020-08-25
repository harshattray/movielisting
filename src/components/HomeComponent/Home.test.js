/**
 * @Author: harsha
 * @Date:   2020-08-14T16:37:34+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T17:06:49+02:00
 */

import React from 'react';
import {shallow} from 'enzyme';
import {HomeComponent} from './HomeComponent';
import 'react-native';
import {findByTestAttr} from '../../helpers/utils';
import renderer from 'react-test-renderer';

test('Home Component', () => {
  const snap = renderer.create(<HomeComponent />).toJSON();
  expect(snap).toMatchSnapshot();
});
