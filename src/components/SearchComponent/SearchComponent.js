/**
 * @Author: harsha
 * @Date:   2020-08-25T12:15:13+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T15:47:53+02:00
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
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');
import {SearchBar} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      processing: false,
      Page: 0,
      TotalPages: 0,
      Results: [],
    };
  }

  search = () => {
    this.scroll.scrollTo({y: 0});
    this.setState({processing: true});
    let thisComponent = this;
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '56fff997ef722ad11d5f6da54adf78a5',
          language: 'en-US',
          page: '1',
          region: 'US',
          query: thisComponent.state.search,
        },
      })
      .then(function (response) {
        thisComponent.setState({
          Page: response.data.page,
          TotalPages: response.data.total_pages,
          Results: response.data.results,
          processing: false,
        });
      })
      .catch(function (error) {
        thisComponent.setState({processing: false});
        alert('Something went wrong');
      });
  };

  loadMore = () => {
    this.setState({processing: true});
    let thisComponent = this;
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '56fff997ef722ad11d5f6da54adf78a5',
          language: 'en-US',
          page: thisComponent.state.Page + 1,
          region: 'US',
          query: thisComponent.state.search,
        },
      })
      .then(function (response) {
        let Results = thisComponent.state.Results.concat(response.data.results);
        thisComponent.setState({
          Page: response.data.page,
          TotalPages: response.data.total_pages,
          Results: Results,
          processing: false,
        });
      })
      .catch(function (error) {
        thisComponent.setState({processing: false});
        alert('Something went wrong');
      });
  };

  updateSearch = (search) => {
    this.setState({search});
  };

  clearData = () => {
    this.setState({
      Page: 0,
      TotalPages: 0,
      Results: [],
    });
  };

  renderLoadMore() {
    if (this.state.Page > 0 && this.state.Page < this.state.TotalPages) {
      return (
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
      );
    } else {
      return null;
    }
  }

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
          },
        ]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[styles.row, styles.headerBackButtom]}>
          <Feather name="arrow-left" style={{color: '#20232A', fontSize: 24}} />
        </TouchableOpacity>
        <View
          style={[
            styles.row,
            {alignItems: 'center', marginTop: 16, marginBottom: 16},
          ]}>
          <SearchBar
            placeholder="Type Here..."
            round={true}
            containerStyle={{
              flex: 1,
              backgroundColor: '#20232A',
              borderBottomWidth: 0,
              borderTopWidth: 0,
              padding: 0,
              marginRight: 10,
            }}
            inputStyle={{height: 55}}
            showLoading={this.state.processing}
            onChangeText={this.updateSearch}
            onClear={this.clearData}
            value={this.state.search}
          />
          <TouchableOpacity
            onPress={() => this.search()}
            style={[styles.row, styles.headerSearchButtom]}>
            <AntDesign
              name="enter"
              size={22}
              style={{transform: [{scaleX: -1}]}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#20232A'}}>
        <StatusBar backgroundColor={'#20232A'} barStyle={'light-content'} />
        <Spinner
          visible={this.state.processing}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        {this.renderHeader()}
        <ScrollView
          ref={(node) => (this.scroll = node)}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={[
                styles.flex,
                styles.column,
                {width: width, paddingHorizontal: 18},
              ]}>
              {this.state.Results.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => {
                      this.props.navigation.navigate('Movie', {movie: item});
                    }}
                    activeOpacity={1}>
                    <View
                      style={[styles.flex, styles.row, {marginVertical: 8}]}>
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

              {this.renderLoadMore()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
  headerBackButtom: {
    backgroundColor: '#CCC',
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  headerSearchButtom: {
    backgroundColor: '#fedc33',
    width: 50,
    height: 50,
    borderRadius: 38 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
