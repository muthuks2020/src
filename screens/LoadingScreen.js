import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { View, Dimensions, Image, StyleSheet } from 'react-native';

import { LoadScreen } from '../utils/AppTor';
import i18n from '../utils/i18n'

var { height, width } = Dimensions.get('window');

export default class LoadingScreen extends Component {

    componentDidMount = async () => {
        try {
            const value = await AsyncStorage.getItem("@language");
            i18n.locale = value ? value : "en"
        } catch (error) {
            i18n.locale = "en"
        }

        AsyncStorage.getItem("UserDetailsStored").then((value) => {
            setTimeout(() => {
                if (value == "true") {
                    LoadScreen('MainScreen', {}, true)
                } else {
                    LoadScreen('LoginScreen', {}, true)
                }
            }, 2000);
        })
    };


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
                {/* <Image 
                    source={require("../source/new.png")}
                    style={{resizeMode: "stretch",
                    position: "absolute",
                    top:30,
                    width: "100%",
                    height: "25%"}}/> */}
                <Image resizeMode={'contain'} style={styles.logo} source={require('../source/logo_text.png')} />

                <Animatable.View style={styles.bottom} animation={'fadeInUp'}>
                    <Image resizeMode={'contain'} style={{ width: width, height: width * 0.64 }} source={require('../source/footer.png')} />
                </Animatable.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E6DDD3', justifyContent: 'center', alignItems: 'center' },
    bottom: { position: 'absolute', bottom: 0 },
    logo: { width: 314, height: 151 }
});

