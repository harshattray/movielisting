/**
 * @Author: harsha
 * @Date:   2020-08-25T12:01:54+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T12:06:12+02:00
 */

import {NavigationActions} from 'react-navigation';

let navigatorProps;

function setTopLevelNavigator(navigatorRef) {
  navigatorProps = navigatorRef;
}

function navigate(routeName, params) {
  navigatorProps.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
