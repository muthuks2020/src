import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


import { LoadScreen, Page, PageContent, Navbar, NavbarItem,Icon } from '../utils/AppTor';

export default class ScarletScreen extends Component {

  componentDidMount() {

    setTimeout(() => {


      LoadScreen('GrayScreen', {
        text: 'Pushed screen'
      });

    }, 1000);

  }

  render() {

    return (
      <Page>
        <Navbar>
          <NavbarItem />
          <NavbarItem title="Hello" />
          <NavbarItem />
        </Navbar>
        <PageContent>
          <Icon name="ios-person" size={30} color="#4F8EF7" />
        </PageContent>
      </Page>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

