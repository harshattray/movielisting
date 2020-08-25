/**
 * @Author: harsha
 * @Date:   2020-08-25T12:13:12+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T15:46:28+02:00
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
const {width, height} = Dimensions.get('window');

import {connect} from 'react-redux';
import {ListAllMovies, EmptyListData} from '../../actions/';

class ListMoviesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const type = this.props.navigation.getParam('type');
    switch (type) {
      case 'Trending':
        this.setState({type: 0});
        break;
      case 'Popular':
        this.setState({type: 1});
        break;
      case 'Upcoming':
        this.setState({type: 2});
        break;
      case 'InTheaters':
        this.setState({type: 3});
        break;
      case 'YearTopMovies':
        this.setState({type: 4});
        break;
      case 'TopRatedMovies':
        this.setState({type: 5});
        break;
      case 'TopAnimation':
        this.setState({type: 6});
        break;
      default: {
      }
    }
  }

  componentDidMount() {
    this.props.ListAllMovies(this.state.type);
  }

  componentWillUnmount() {
    this.props.EmptyListData();
  }

  loadMore = () => {
    if (this.props.Page >= this.props.TotalPages) {
      // no more pages available
      alert('End of results');
    } else {
      //fetch more images
      this.props.ListAllMovies(this.state.type);
    }
  };

  renderHeader() {
    return (
      <View
        style={[
          styles.flex,
          styles.column,
          styles.shadow,
          {
            width: width,
            paddingTop: 20,
            paddingHorizontal: 18,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: 15,
          },
        ]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[
            styles.row,
            {
              backgroundColor: '#fedc33',
              width: 38,
              height: 38,
              borderRadius: 38 / 2,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Feather name="arrow-left" style={{color: '#20232A', fontSize: 24}} />
        </TouchableOpacity>
      </View>
    );
  }

  renderRatings(rating) {
    const stars = new Array(5).fill(0);
    return stars.map((item, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={index.toString()}
          size={10}
          color={activeStar ? '#007BFA' : '#DCE0E9'}
        />
      );
    });
  }

  renderItems() {
    return this.props.List.map((item, index) => {
      return index == 0 ? (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => {
            this.props.navigation.navigate('Movie', {movie: item});
          }}
          activeOpacity={1}>
          <View
            key={index.toString()}
            style={[
              styles.flex,
              styles.shadow,
              {
                width: width - 36,
                height: width * 0.65,
                marginHorizontal: 9,
                marginBottom: 9,
              },
            ]}>
            <View
              style={[{flex: 1, backgroundColor: '#CCC', overflow: 'hidden'}]}>
              <Image
                source={{
                  uri: 'http://image.tmdb.org/t/p/w185' + item.backdrop_path,
                }}
                resizeMethod="resize"
                style={{flex: 1, width: null, height: null}}
              />
              <View
                style={[
                  styles.flex,
                  styles.row,
                  {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 60,
                    backgroundColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    opacity: 0.7,
                    paddingHorizontal: 18,
                  },
                ]}>
                <FontAwesome
                  name={'circle-o'}
                  style={{marginRight: 10, fontSize: 18, color: '#41d2a7'}}
                />
                <Text style={{color: '#FFF', fontSize: 18, fontWeight: '500'}}>
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => {
            this.props.navigation.navigate('Movie', {movie: item});
          }}
          activeOpacity={1}>
          <View
            key={index.toString()}
            style={[
              styles.flex,
              styles.column,
              {
                width: width / 2 - 27,
                height: width * 0.7,
                margin: 9,
                backgroundColor: '#4c4e54',
                padding: 9,
              },
            ]}>
            <View
              style={{
                flex: 0.86,
                marginBottom: 9,
                backgroundColor: '#CCC',
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: 'http://image.tmdb.org/t/p/w185' + item.poster_path,
                }}
                resizeMethod="resize"
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'stretch',
                }}
              />
            </View>
            <View
              style={[
                styles.column,
                {
                  flex: 0.24,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <Text style={{color: '#CCC', fontSize: 16, fontWeight: '500'}}>
                {item.title.slice(0, 12)}
              </Text>
              <Text style={{color: '#CCC', fontSize: 12}}>
                {item.overview.slice(0, 18) + ' ...'}
              </Text>
              <View style={styles.row}>
                {this.renderRatings(item.vote_average / 2)}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#20232A'}}>
        <StatusBar backgroundColor={'#20232A'} barStyle={'light-content'} />
        <Spinner
          visible={this.props.Processing}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        {this.renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.row,
              {
                flex: 1,
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                paddingHorizontal: 9,
              },
            ]}>
            {this.renderItems()}
          </View>
          <TouchableOpacity
            onPress={() => this.loadMore()}
            style={[
              styles.flex,
              styles.row,
              {
                marginHorizontal: 18,
                paddingVertical: 12,
                backgroundColor: '#fedc33',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 12,
                borderRadius: 12,
              },
            ]}>
            <Text style={{color: '#20232A', fontWeight: '500', fontSize: 24}}>
              See More
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Message: state.ListMoviesReducer.Message,
    Processing: state.ListMoviesReducer.Processing,
    Page: state.ListMoviesReducer.Page,
    List: state.ListMoviesReducer.List,
    TotalPages: state.ListMoviesReducer.TotalPages,
  };
};
// redux
export default connect(mapStateToProps, {ListAllMovies, EmptyListData})(
  ListMoviesComponent,
);

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
});
