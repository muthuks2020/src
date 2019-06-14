import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';






export default class SwipeMenu extends Component {

 render() {
       
        return (
    <View style={styles.container}>
      <Text style={{fontFamily:'Rubik'}}>Hello there!</Text>
      </View>
  )
}
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
  })
  
