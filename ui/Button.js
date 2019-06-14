import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator

} from 'react-native';


export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity onPress={()=>{if(this.props.onPress) this.props.onPress()}} style={this.props.style} disabled={this.props.disabled}>
                <View 
                    borderRadius={this.props.yellow && !this.props.radius ? 0 : 8} 
                    style={[styles.container,{backgroundColor: this.props.yellow ? '#fdda24': '#46763A'}]}>
                    { this.props.disabled && 
                        <ActivityIndicator size='small' style={{right:5}} color={this.props.yellow ? "#46763A" : "#fff"}/>
                    }
                    <Text style={[styles.text, {color:this.props.yellow ? '#46763a' : '#fff'}]}>{this.props.children}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        height:49
    },
    text:{
        fontSize:18,
        fontWeight: '500',
        fontFamily:'Rubik'
    }
})

