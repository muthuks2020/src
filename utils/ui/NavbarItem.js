import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';
import { IOS_BAR_COLOR, IOS_BAR_COLOR_BORDER, ISO_BAR_ICON_COLOR } from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack, goHome } from '../AppTor';

export default class NavbarItem extends Component {
    constructor(props) {
        super(props);
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    handleOnPress = () => {
        Alert.alert("", 'You forecast information will not be saved', [
            {
                text: 'Ok',
                onPress: () => { this.props.firstTab ? goHome() : goBack() }
            },
            {
                text: 'Cancel'
            }
        ],
            { cancelable: false })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.title && <Text style={styles.title}>{this.props.title}</Text>}
                { (this.props.backLink && this.props.displayWarning) ? (
                    <TouchableOpacity onPress={() => this.handleOnPress()} style={styles.linkItem}>
                        <View style={styles.linkItem}>
                            <Icon name="ios-arrow-back" size={28} color={ISO_BAR_ICON_COLOR} />
                            <Text style={{ display: this.props.showText ? "flex" : "none", marginLeft: 5, color: ISO_BAR_ICON_COLOR, fontSize: 16 }}>{this.props.backText}</Text>
                        </View>
                    </TouchableOpacity>
                ) :  this.props.backLink && 
                        (<TouchableOpacity onPress={() => this.props.firstTab ? goHome() : goBack()} style={styles.linkItem}>
                            <View style={styles.linkItem}>
                                <Icon name="ios-arrow-back" size={28} color={ISO_BAR_ICON_COLOR} />
                                <Text style={{ display: this.props.showText ? "flex" : "none", marginLeft: 5, color: ISO_BAR_ICON_COLOR, fontSize: 16 }}>{this.props.backText}</Text>
                            </View>
                        </TouchableOpacity>)}
                {this.props.children}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 44,
        minHeight: 44
    },
    linkItem: {
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontWeight: '600',
        fontSize: 17, fontFamily: 'Rubik'
    }
});