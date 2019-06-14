import React, { Component } from 'react';

import {
    View
} from 'react-native';


export default class Block extends Component {
    render() {
        return (
          <View {...this.props} style={{padding:20}}>
            {this.props.children}
          </View>
        )
    }
}

