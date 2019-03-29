import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeComponent from '../../components/Home/Home';
import DetailsComponent from '../../components/Details/Details';
import SortArticles from '../../components/SortArticles/SortArticles';
import AllArticles from '../../components/AllArticles/AllArticles';
import MyWebView from '../../components/WebView/WebView';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeComponent,
  },
  Details: {
    screen: DetailsComponent
  },
  SortArticles: {
    screen: SortArticles
  },
  AllArticles: {
    screen: AllArticles
  },
  MyWebView: {
    screen: MyWebView
  }
}, {
  initialRouteName: "Home"
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
