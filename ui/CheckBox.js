import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';



export default class CheckBox extends Component {
    state = {
        active: false
    }
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.setState({ active: !this.state.active }, () => this.props.onChange(this.state.active))
            }
            } style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 12, width: 12 }} resizeMode={'cover'} source={this.state.active ? require('../source/checkBox.png') : require('../source/checkBoxGray.png')} />
                    <Text style={{fontFamily:'Rubik', marginLeft: 13, fontSize: 14, color: '#4a4a4a' }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

