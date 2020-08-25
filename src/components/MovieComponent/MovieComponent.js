/**
 * @Author: harsha
 * @Date:   2020-08-25T12:14:01+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T15:47:05+02:00
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
const {width, height} = Dimensions.get('window');

import {connect} from 'react-redux';
import {GetMovieData, EmptyMovieData} from '../../actions/';

class MovieComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const movie = this.props.navigation.getParam('movie');
    this.props.GetMovieData(movie.id);
  }

  componentWillUnmount() {
    this.props.EmptyMovieData();
  }

  renderHeader() {
    return (
      <View style={[styles.flex, styles.row, styles.header]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[
            styles.flex,
            styles.row,
            styles.shadow,
            styles.headerBackButtom,
          ]}>
          <Feather name="arrow-left" style={{color: '#FFF', fontSize: 24}} />
        </TouchableOpacity>
      </View>
    );
  }

  hasNudity(con) {
    if (con) {
      return (
        <AntDesign
          name={'check'}
          style={{color: 'green', fontSize: 18, fontWeight: 'bold'}}
        />
      );
    } else {
      return (
        <AntDesign
          name={'close'}
          style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}
        />
      );
    }
  }

  render() {
    const movie = this.props.navigation.getParam('movie');
    return (
      <View style={{flex: 1, backgroundColor: '#20232A'}}>
        {this.renderHeader()}
        <StatusBar hidden={true} barStyle={'light-content'} />
        <Spinner
          visible={this.props.Processing}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.flex,
              {backgroundColor: '#CCC', width: width, height: width},
            ]}>
            <Image
              source={{
                uri: 'http://image.tmdb.org/t/p/w185' + movie.backdrop_path,
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
              styles.flex,
              styles.borderTop,
              {
                backgroundColor: '#20232A',
                width: width,
                marginTop: -36,
                paddingTop: 36,
                paddingHorizontal: 36,
              },
            ]}>
            <View
              style={[
                styles.flex,
                styles.row,
                {justifyContent: 'space-between', alignItems: 'center'},
              ]}>
              <View style={[{flex: 0.75}]}>
                <Text style={{color: '#FFF', fontSize: 28, fontWeight: '500'}}>
                  {movie.title}
                </Text>
              </View>
              <View
                style={[
                  styles.row,
                  {flex: 0.25, justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text
                  style={{fontSize: 24, color: '#fedc33', fontWeight: '500'}}>
                  {movie.vote_average}
                </Text>
                <AntDesign
                  name={'star'}
                  style={{color: '#fedc33', fontSize: 24, marginLeft: 4}}
                />
              </View>
            </View>
            <View
              style={[
                styles.flex,
                styles.row,
                {
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 12,
                  flexWrap: 'wrap',
                },
              ]}>
              {this.props.Generes.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      backgroundColor: '#222d3e',
                      padding: 4,
                      marginRight: 6,
                      marginTop: 4,
                    }}>
                    <Text style={{color: '#397cdb'}}>{item.name}</Text>
                  </View>
                );
              })}
            </View>

            <View
              style={[
                styles.flex,
                styles.row,
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 12,
                },
              ]}>
              <View
                style={[
                  styles.flex,
                  styles.row,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text style={{color: '#CCC', fontSize: 14, marginRight: 4}}>
                  {movie.release_date}
                </Text>
                <AntDesign
                  name={'clockcircleo'}
                  style={{color: '#CCC', fontSize: 14}}
                />
              </View>

              <View
                style={[
                  styles.flex,
                  styles.row,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text style={{color: '#CCC', fontSize: 14, marginRight: 4}}>
                  Nudity
                </Text>
                {this.hasNudity(movie.adult)}
              </View>

              <View
                style={[
                  styles.flex,
                  styles.row,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Text style={{color: '#CCC', fontSize: 14, marginRight: 4}}>
                  {movie.vote_count}
                </Text>
                <Text style={{color: '#CCC', fontSize: 14, marginRight: 4}}>
                  Votes
                </Text>
              </View>
            </View>

            <View style={[styles.flex, styles.column, {marginTop: 12}]}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 24,
                  fontWeight: '500',
                  marginBottom: 4,
                }}>
                Introduction
              </Text>
              <Text style={{color: '#CCC', fontSize: 18}}>
                {movie.overview}
              </Text>
            </View>
            <View style={[styles.flex, styles.column, {marginTop: 12}]}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 24,
                  fontWeight: '500',
                  marginBottom: 4,
                }}>
                Languages
              </Text>
              <View
                style={[
                  styles.flex,
                  styles.row,
                  {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 4,
                    flexWrap: 'wrap',
                  },
                ]}>
                {this.props.Languages.map((item, index) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        backgroundColor: '#28273f',
                        padding: 4,
                        marginRight: 6,
                        marginTop: 4,
                      }}>
                      <Text style={{color: '#8c67d5'}}>{item.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={[styles.flex, styles.column, {marginTop: 12}]}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 24,
                  fontWeight: '500',
                  marginBottom: 4,
                }}>
                Production Companies
              </Text>
              <View
                style={[
                  styles.flex,
                  styles.row,
                  {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 4,
                    flexWrap: 'wrap',
                  },
                ]}>
                {this.props.ProductionCompanies.map((item, index) => {
                  return (
                    <View
                      key={index.toString()}
                      style={[
                        styles.flex,
                        {
                          backgroundColor: '#FFF',
                          width: 100,
                          height: 100,
                          borderRadius: 32,
                          marginTop: 8,
                          marginRight: 8,
                          overflow: 'hidden',
                        },
                      ]}>
                      <Image
                        source={{
                          uri:
                            'http://image.tmdb.org/t/p/w185' + item.logo_path,
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
                  );
                })}
              </View>
            </View>
            <View style={[styles.flex, styles.column, {marginTop: 24}]}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 24,
                  fontWeight: '500',
                  marginBottom: 4,
                }}>
                Similar Movies
              </Text>
              <View style={[styles.flex, styles.column]}>
                {this.props.List.map((item, index) => {
                  return (
                    <TouchableOpacity key={index.toString()} activeOpacity={1}>
                      <View
                        style={[
                          styles.flex,
                          styles.row,
                          {
                            borderBottomColor: '#c8c8c8',
                            borderBottomWidth: 0.2,
                          },
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
                                'http://image.tmdb.org/t/p/w185' +
                                item.poster_path,
                            }}
                            resizeMethod="resize"
                            style={{flex: 1, width: null, height: null}}
                          />
                        </View>
                        <View style={[styles.column, {flex: 1, paddingTop: 8}]}>
                          <Text
                            style={{
                              color: '#CCC',
                              fontSize: 18,
                              fontWeight: '500',
                            }}>
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Message: state.MovieReducer.Message,
    Processing: state.MovieReducer.Processing,
    List: state.MovieReducer.List,
    Generes: state.MovieReducer.Generes,
    Languages: state.MovieReducer.Languages,
    ProductionCompanies: state.MovieReducer.ProductionCompanies,
  };
};
// redux
export default connect(mapStateToProps, {GetMovieData, EmptyMovieData})(
  MovieComponent,
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
  borderTop: {
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    height: 70,
    backgroundColor: 'transparent',
    zIndex: 1,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  headerBackButtom: {
    backgroundColor: '#20232A',
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
});
