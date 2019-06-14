import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

var { height, width } = Dimensions.get('window');

import { Button, Block } from '../ui';
import * as actions from '../actions/profile'
import { LoadScreen } from '../utils/AppTor';

class LoginScreen extends Component {

  state = {
    disabled: false
  }

  loginUser() {
   // LoadScreen("MainScreen")
    this.setState({ disabled: true })
    this.props.login((error) => {
      if (error != null) {
        this.setState({ disabled: false })
        Alert.alert("Error", "Something went wrong")
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Image 
            resizeMode={ "contain"}
            source={width<height? require("../source/background.png"): require("../source/bg.png")}
            style={{
              resizeMode: "contain",
              position: "absolute",
              width: "100%",
              height: "100%"
          }} />
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
          <Image resizeMode={'contain'} style={styles.logo} source={require('../source/logo_text.png')} />
        </View>
        <Text style={{ textAlign: 'center', color: "#4a773c", fontWeight: '100', fontFamily: 'Rubik' }}>v0.9.9.b</Text>
        <Animatable.View animation={'fadeInUp'} style={{ zIndex: 100 }}>
          <Block>
            <Button onPress={() => this.loginUser()} disabled={this.state.disabled}> {this.state.disabled ? "Loading..." : "Login"}</Button>
          </Block>
        </Animatable.View>
        <View style={styles.bottom}>
          <Image resizeMode={'contain'} style={{ width: width, height: width * 0.64 }} source={require('../source/footer.png')} />
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6DDD3', justifyContent: 'center', justifyContent: 'center' },
  logo: { width: 314, height: 151 },
  bottom: { position: 'absolute', bottom: 0 },

});

export default connect(null, actions)(LoginScreen)