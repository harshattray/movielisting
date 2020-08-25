/**
 * @Author: harsha
 * @Date:   2020-08-25T12:02:06+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T15:48:11+02:00
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeComponent from '../components/HomeComponent/HomeComponent';
import ListMoviesComponent from '../components/ListMoviesComponent/ListMoviesComponent';
import MovieComponent from '../components/MovieComponent/MovieComponent';
import SearchComponent from '../components/SearchComponent/SearchComponent';

const Routes = createStackNavigator(
  {
    Home: {
      screen: HomeComponent,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    ListMovies: {
      screen: ListMoviesComponent,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    Movie: {
      screen: MovieComponent,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    Search: {
      screen: SearchComponent,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  },
  {
    initialParams: 'Home',
  },
);

const AppContainer = createAppContainer(Routes);

export default AppContainer;
