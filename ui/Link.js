import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class Link extends Component {
    render() {
        return (
            <TouchableOpacity onPress={()=>{if(this.props.onPress) this.props.onPress()}} style={this.props.style}>
                    <Text style={styles.text}>{this.props.children}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    text:{
        padding:10,
        color:'#46763a',
        fontSize:16,
        fontWeight: '500',fontFamily:'Rubik'
    }
})

