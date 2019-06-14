import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { MenuItem, Link, TitleBlock, CardItem } from '../../ui';
import { PageContent, Navbar, NavbarItem } from '../../utils/AppTor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import i18n from "../../utils/i18n";

export default class AccuracyTab extends Component {


    render() {

        return (
            <View style={{ flex: 1 }}>
                <Navbar>
                    <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")} firstTab={true}/>
                    <NavbarItem title={i18n.t("accuracy")} />
                    <NavbarItem />

                </Navbar>
                <View style={{ flex: 1 }} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});

