import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class TitleBlock extends Component {
    render() {
        return (
           <View style={this.props.style}>
               <Text style={styles.title}>{this.props.children}</Text>
           </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize:14,
        fontWeight:'500',
        lineHeight:17,fontFamily:'Rubik'
    }
})

