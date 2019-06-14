import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/Entypo';

export default class MenuItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={()=>{if(this.props.onPress) this.props.onPress()}} style={this.props.style}>
                <View borderRadius={12} style={[styles.container]}>
                    <View style={{flexDirection:'row',
        alignItems: 'center',}}>
                    <Image source={this.props.icon} style={{height:23, width:23}} resizeMode={'contain'} />
                    <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                    <Icon name={'chevron-thin-right'} size={20} color={'#46763a'}/>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height:55,
        backgroundColor: '#fdda24'
    },
    text:{
        marginLeft: 46,
        fontSize:16,
        color:'#46763a',
        fontFamily:"Rubik"
    }
})

