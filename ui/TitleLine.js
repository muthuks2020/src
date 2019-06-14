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
           <View style={{height:32, backgroundColor:'#d8d8d8',justifyContent:'center'}}>
               <Text style={styles.title}>{this.props.children}</Text>
           </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize:12,
        color:'#4a4a4a',
        paddingLeft: 12,
        paddingRight: 12,fontFamily:'Rubik'
    }
})

