import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';

export default class Page extends Component {


    render() {

        return (
        <ScrollView {...this.props} style={[styles.container,this.props.style, this.props.noPadding && {padding:0}]}>
                {this.props.children}
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    }
});

