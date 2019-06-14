import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import  {IOS_BAR_COLOR} from '../style';

export default class Page extends Component {


    render() {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: IOS_BAR_COLOR}}>
            <View style={styles.container}>
                {this.props.children}
            </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

