/**
 * @Author: harsha
 * @Date:   2020-08-25T11:56:53+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T15:41:27+02:00
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GetAllData} from '../../actions';

const {width, height} = Dimensions.get('window');

import {connect} from 'react-redux';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedTap: 1,
    };
  }

  componentDidMount() {
    this.props.GetAllData();
  }

  renderHeader() {
    return (
      <View
        style={[
          styles.flex,
          styles.column,
          {width: width, height: 100, paddingTop: 35, paddingHorizontal: 18},
        ]}>
        <View
          style={[
            styles.flex,
            styles.row,
            {
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 15,
            },
          ]}>
          <Text style={{color: '#FFF', fontWeight: '500', fontSize: 28}}>
            Home
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}
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
            <Feather name="search" style={{color: '#20232A', fontSize: 24}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderSlider() {
    return (
      <View>
        <View
          style={[
            styles.flex,
            styles.row,
            {marginTop: 10, paddingHorizontal: 18},
          ]}>
          <View style={[styles.row, {alignItems: 'center', marginRight: 36}]}>
            {this.state.SelectedTap == 1 ? (
              <FontAwesome
                name="circle"
                style={{color: '#fedc33', marginRight: 8, fontSize: 8}}
              />
            ) : null}
            <Text
              onPress={() => this.handleSliderTap(1)}
              style={[
                this.state.SelectedTap == 1
                  ? {color: '#fedc33'}
                  : {color: '#5e6169'},
                {fontSize: 18, fontWeight: '500'},
              ]}>
              Trending
            </Text>
          </View>
          <View style={[styles.row, {alignItems: 'center', marginRight: 36}]}>
            {this.state.SelectedTap == 2 ? (
              <FontAwesome
                name="circle"
                style={{color: '#fedc33', marginRight: 8, fontSize: 8}}
              />
            ) : null}
            <Text
              onPress={() => this.handleSliderTap(2)}
              style={[
                this.state.SelectedTap == 2
                  ? {color: '#fedc33'}
                  : {color: '#5e6169'},
                {fontSize: 18, fontWeight: '500'},
              ]}>
              Popular
            </Text>
          </View>
          <View style={[styles.row, {alignItems: 'center', marginRight: 36}]}>
            {this.state.SelectedTap == 3 ? (
              <FontAwesome
                name="circle"
                style={{color: '#fedc33', marginRight: 8, fontSize: 8}}
              />
            ) : null}
            <Text
              onPress={() => this.handleSliderTap(3)}
              style={[
                this.state.SelectedTap == 3
                  ? {color: '#fedc33'}
                  : {color: '#5e6169'},
                {fontSize: 18, fontWeight: '500'},
              ]}>
              Upcoming
            </Text>
          </View>
        </View>

        <ScrollView
          ref={(node) => (this.scroll = node)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginTop: 20}}>
          {this.renderliderSelectedTap()}
        </ScrollView>
      </View>
    );
  }

  handleSliderTap(S) {
    this.setState({SelectedTap: S});
    this.scroll.scrollTo({x: 0});
  }

  renderliderSelectedTap() {
    switch (this.state.SelectedTap) {
      case 1: {
        console.log(this.props.Trending, 'this.props.Trending');
        return (
          <View style={styles.row}>
            {this.props.Trending.map((item, index) => {
              console.log(item, 'item');
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    this.props.navigation.navigate('Movie', {movie: item});
                  }}
                  activeOpacity={1}>
                  <View
                    style={[
                      styles.flex,
                      styles.shadow,
                      {
                        backgroundColor: '#CCC',
                        width: 280,
                        height: 380,
                        borderRadius: 70,
                        marginLeft: 18,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      source={{
                        uri:
                          'http://image.tmdb.org/t/p/w185' + item.poster_path,
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
                </TouchableOpacity>
              );
            })}

            <View
              style={[
                styles.flex,
                {
                  backgroundColor: 'transparent',
                  width: 120,
                  height: 380,
                  marginHorizontal: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('ListMovies', {
                    type: 'Trending',
                  })
                }
                style={{color: '#ff4c6f', fontWeight: '500', fontSize: 26}}>
                See All
              </Text>
            </View>
          </View>
        );
      }
      case 2: {
        return (
          <View style={styles.row}>
            {this.props.Popular.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    this.props.navigation.navigate('Movie', {movie: item});
                  }}
                  activeOpacity={1}>
                  <View
                    style={[
                      styles.flex,
                      styles.shadow,
                      {
                        backgroundColor: '#CCC',
                        width: 280,
                        height: 380,
                        borderRadius: 70,
                        marginLeft: 18,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      source={{
                        uri:
                          'http://image.tmdb.org/t/p/w185' + item.poster_path,
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
                </TouchableOpacity>
              );
            })}

            <View
              style={[
                styles.flex,
                {
                  backgroundColor: 'transparent',
                  width: 120,
                  height: 380,
                  marginHorizontal: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('ListMovies', {
                    type: 'Popular',
                  })
                }
                style={{color: '#ff4c6f', fontWeight: '500', fontSize: 26}}>
                See All
              </Text>
            </View>
          </View>
        );
      }
      case 3: {
        return (
          <View style={styles.row}>
            {this.props.Upcoming.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    this.props.navigation.navigate('Movie', {movie: item});
                  }}
                  activeOpacity={1}>
                  <View
                    style={[
                      styles.flex,
                      styles.shadow,
                      {
                        backgroundColor: '#CCC',
                        width: 280,
                        height: 380,
                        borderRadius: 70,
                        marginLeft: 18,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      source={{
                        uri:
                          'http://image.tmdb.org/t/p/w185' + item.poster_path,
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
                </TouchableOpacity>
              );
            })}

            <View
              style={[
                styles.flex,
                {
                  backgroundColor: 'transparent',
                  width: 120,
                  height: 380,
                  marginHorizontal: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('ListMovies', {
                    type: 'Upcoming',
                  })
                }
                style={{color: '#ff4c6f', fontWeight: '500', fontSize: 26}}>
                See All
              </Text>
            </View>
          </View>
        );
      }
    }
  }

  renderInTheater() {
    return (
      <View>
        <View
          style={[
            styles.flex,
            styles.row,
            {
              marginTop: 30,
              marginBottom: 20,
              width: width,
              paddingHorizontal: 18,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text style={{color: '#ff4c6f', fontWeight: '500', fontSize: 24}}>
            In Theaters
          </Text>
          <Text
            onPress={() =>
              this.props.navigation.navigate('ListMovies', {type: 'InTheaters'})
            }
            style={{color: '#ff4c6f', fontWeight: '500', fontSize: 16}}>
            See All
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 20}}>
          {this.props.InTheaters.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  this.props.navigation.navigate('Movie', {movie: item});
                }}
                activeOpacity={1}>
                <View
                  style={[
                    styles.flex,
                    styles.shadow,
                    {
                      backgroundColor: '#CCC',
                      width: 120,
                      height: 120,
                      borderRadius: 36,
                      marginLeft: 18,
                      overflow: 'hidden',
                    },
                  ]}>
                  <Image
                    source={{
                      uri: 'http://image.tmdb.org/t/p/w185' + item.poster_path,
                    }}
                    resizeMethod="resize"
                    style={{flex: 1, width: null, height: null}}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  renderYearsTopMovies() {
    return (
      <View>
        <View
          style={[
            styles.flex,
            styles.row,
            {
              marginTop: 15,
              width: width,
              paddingHorizontal: 18,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text style={{color: '#ff4c6f', fontWeight: '500', fontSize: 24}}>
            Year's Top Movies
          </Text>
          <Text
            onPress={() =>
              this.props.navigation.navigate('ListMovies', {
                type: 'YearTopMovies',
              })
            }
            style={{color: '#ff4c6f', fontWeight: '500', fontSize: 16}}>
            See All
          </Text>
        </View>

        <View
          style={[
            styles.flex,
            styles.column,
            {width: width, paddingHorizontal: 18},
          ]}>
          {this.props.YearTopMovies.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  this.props.navigation.navigate('Movie', {movie: item});
                }}
                activeOpacity={1}>
                <View
                  style={[
                    styles.flex,
                    styles.row,
                    index != 4
                      ? {borderBottomColor: '#c8c8c8', borderBottomWidth: 0.2}
                      : null,
                    {marginBottom: 8, paddingVertical: 18},
                  ]}>
                  <View
                    style={[
                      styles.flex,
                      {
                        width: 90,
                        height: 90,
                        borderRadius: 24,
                        backgroundColor: '#CCC',
                        marginRight: 12,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      source={{
                        uri:
                          'http://image.tmdb.org/t/p/w185' + item.poster_path,
                      }}
                      resizeMethod="resize"
                      style={{flex: 1, width: null, height: null}}
                    />
                  </View>
                  <View style={[styles.column, {flex: 1, paddingTop: 8}]}>
                    <Text
                      style={{color: '#CCC', fontSize: 18, fontWeight: '500'}}>
                      {item.title}
                    </Text>
                    <Text style={{color: '#CCC'}}>
                      {item.overview.slice(0, 60) + ' ...'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  renderTopRatedMovies() {
    return (
      <View>
        <View
          style={[
            styles.flex,
            styles.row,
            {
              marginTop: 15,
              width: width,
              paddingHorizontal: 18,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text style={{color: '#ff4c6f', fontWeight: '500', fontSize: 24}}>
            Top Rated Movies
          </Text>
          <Text
            onPress={() =>
              this.props.navigation.navigate('ListMovies', {
                type: 'TopRatedMovies',
              })
            }
            style={{color: '#ff4c6f', fontWeight: '500', fontSize: 16}}>
            See All
          </Text>
        </View>

        <View
          style={[
            styles.flex,
            styles.column,
            {width: width, paddingHorizontal: 18},
          ]}>
          {this.props.TopRatedMovies.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  this.props.navigation.navigate('Movie', {movie: item});
                }}
                activeOpacity={1}>
                <View
                  style={[
                    styles.flex,
                    styles.row,
                    index != 4
                      ? {borderBottomColor: '#c8c8c8', borderBottomWidth: 0.2}
                      : null,
                    {marginBottom: 8, paddingVertical: 18},
                  ]}>
                  <View
                    style={[
                      styles.flex,
                      {
                        width: 90,
                        height: 90,
                        borderRadius: 24,
                        backgroundColor: '#CCC',
                        marginRight: 12,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      source={{
                        uri:
                          'http://image.tmdb.org/t/p/w185' + item.poster_path,
                      }}
                      resizeMethod="resize"
                      style={{flex: 1, width: null, height: null}}
                    />
                  </View>
                  <View style={[styles.column, {flex: 1, paddingTop: 8}]}>
                    <Text
                      style={{color: '#CCC', fontSize: 18, fontWeight: '500'}}>
                      {item.title}
                    </Text>
                    <Text style={{color: '#CCC'}}>
                      {item.overview.slice(0, 60) + ' ...'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  renderTopAnimationMovies() {
    return (
      <View>
        <View
          style={[
            styles.flex,
            styles.row,
            {
              marginTop: 15,
              width: width,
              paddingHorizontal: 18,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text style={{color: '#ff4c6f', fontWeight: '500', fontSize: 24}}>
            Top Animation Movies
          </Text>
          <Text
            onPress={() =>
              this.props.navigation.navigate('ListMovies', {
                type: 'TopAnimation',
              })
            }
            style={{color: '#ff4c6f', fontWeight: '500', fontSize: 16}}>
            See All
          </Text>
        </View>

        <View
          style={[
            styles.flex,
            styles.column,
            {width: width, paddingHorizontal: 18},
          ]}>
          {this.props.TopAnimation.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  this.props.navigation.navigate('Movie', {movie: item});
                }}
                activeOpacity={1}>
                <View
                  style={[
                    styles.flex,
                    styles.row,
                    index != 4
                      ? {borderBottomColor: '#c8c8c8', borderBottomWidth: 0.2}
                      : null,
                    {marginBottom: 8, paddingVertical: 18},
                  ]}>
                  <View
                    style={[
                      styles.flex,
                      {
                        width: 90,
                        height: 90,
                        borderRadius: 24,
                        backgroundColor: '#CCC',
                        marginRight: 12,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      source={{
                        uri:
                          'http://image.tmdb.org/t/p/w185' + item.poster_path,
                      }}
                      resizeMethod="resize"
                      style={{flex: 1, width: null, height: null}}
                    />
                  </View>
                  <View style={[styles.column, {flex: 1, paddingTop: 8}]}>
                    <Text
                      style={{color: '#CCC', fontSize: 18, fontWeight: '500'}}>
                      {item.title}
                    </Text>
                    <Text style={{color: '#CCC'}}>
                      {item.overview.slice(0, 60) + ' ...'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#20232A'}}>
        <StatusBar backgroundColor={'#20232A'} barStyle={'light-content'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderHeader()}
          {this.renderSlider()}
          {this.renderInTheater()}
          {this.renderYearsTopMovies()}
          {this.renderTopRatedMovies()}
          {this.renderTopAnimationMovies()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Message: state.HomeReducer.Message,
    Processing: state.HomeReducer.Processing,
    Trending: state.HomeReducer.Trending,
    Popular: state.HomeReducer.Popular,
    Upcoming: state.HomeReducer.Upcoming,
    InTheaters: state.HomeReducer.InTheaters,
    YearTopMovies: state.HomeReducer.YearTopMovies,
    TopRatedMovies: state.HomeReducer.TopRatedMovies,
    TopAnimation: state.HomeReducer.TopAnimation,
  };
};
export default connect(mapStateToProps, {GetAllData})(HomeComponent);

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
