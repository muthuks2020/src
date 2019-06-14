import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';

import i18n from '../utils/i18n'

export default class Tabbar extends React.Component {
    render() {
        const { tabs, activeTab } = this.props
        return (
            <View style={[styles.tabs, this.props.style]}>
                <TouchableOpacity key={tabs[0]} onPress={() => this.props.goToPage(0)} style={styles.tab}>
                    <Image 
                        resizeMode={"contain"} 
                        style={{ height: 24, width: 24 }} 
                        source={0 == activeTab ? require('../source/tab1-a.png') : require('../source/tab1.png') }
                    />
                    <Text style={[styles.title, 0 == activeTab && { color: '#4a773c' }]}>{i18n.t('home')}</Text>
                </TouchableOpacity> 

                <TouchableOpacity key={tabs[1]} onPress={() => this.props.goToPage(1)} style={styles.tab}>
                    <Image 
                        resizeMode={"contain"} 
                        style={{ height: 24, width: 24 }} 
                        source={1 == activeTab ? require('../source/tab2-a.png') : require('../source/tab2.png') }
                    />
                    <Text style={[styles.title, 1 == activeTab && { color: '#4a773c' }]}>{i18n.t('forecast')}</Text>
                </TouchableOpacity> 

                <TouchableOpacity key={tabs[2]} onPress={() => this.props.goToPage(2)} style={styles.tab}>
                    <Image 
                        resizeMode={"contain"} 
                        style={{ height: 24, width: 24 }} 
                        source={2 == activeTab ? require('../source/tab3-a.png') : require('../source/tab3.png') }
                    />
                    <Text style={[styles.title, 2 == activeTab && { color: '#4a773c' }]}>{i18n.t('orders')}</Text>
                </TouchableOpacity> 

                <TouchableOpacity key={tabs[3]} onPress={() => this.props.goToPage(3)} style={styles.tab}>
                    <Image 
                        resizeMode={"contain"} 
                        style={{ height: 24, width: 24 }} 
                        source={3 == activeTab ? require('../source/tab4-a.png') : require('../source/tab4.png') }
                    />
                    <Text style={[styles.title, 3 == activeTab && { color: '#4a773c' }]}>{i18n.t('accuracy')}</Text>
                </TouchableOpacity> 

                <TouchableOpacity key={tabs[4]} onPress={() => this.props.goToPage(4)} style={styles.tab}>
                    <Image 
                        resizeMode={"contain"} 
                        style={{ height: 25, width: 22 }} 
                        source={4 == activeTab ? require('../source/tab5-a.png') : require('../source/tab5.png') }
                    />
                    <Text style={[styles.title, 4 == activeTab && { color: '#4a773c' }]}>{i18n.t('profile')}</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    title: {
        color: '#9b9b9b',
        fontSize: 12,fontFamily:'Rubik'
    },
    tabs: {
        borderTopColor: '#c4c4c4',
        borderTopWidth: 1,
        height: 61,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
    },
}); 