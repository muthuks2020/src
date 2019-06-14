import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';


export default class ItemValue extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.subtitle}>{this.props.label}</Text>
                {this.props.input ? <TextInput style={styles.input} />
                    : <Text style={styles.title}>{this.props.value}</Text>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
    },
    title: {
        paddingTop: 20,
        fontSize: 14,
        lineHeight: 16,fontFamily:'Rubik'
    },
    subtitle: {
        fontSize: 12,
        color: '#9B9B9B',fontFamily:'Rubik'
    },
    input: {
        color: '#4a4a4a',
        fontSize: 14,
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#E6E5E4',
        height: 36,fontFamily:'Rubik'
    }
})

