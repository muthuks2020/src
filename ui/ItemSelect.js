import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Picker from 'react-native-wheel-picker'
import { Navbar, NavbarItem } from '../utils/AppTor';
var PickerItem = Picker.Item;
import Icon from 'react-native-vector-icons/dist/Entypo';

export default class ItemSelect extends Component {
    state = {
        modalVisible: false
    }

    render() {
        let selectedIndex = this.props.selectedIndex
        console.log("Selected index ", selectedIndex)
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.label?<Text style={styles.subtitle}>{this.props.label}</Text>:null}<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.setState({ ...this.state, modalVisible: true })}>
                        <View style={{
                            justifyContent: 'space-between', alignItems: 'center', minWidth: '50%', marginTop: 8, flexDirection: 'row', borderWidth: 1,
                            borderRadius: 4,
                            borderColor: '#E6E5E4',
                            height: 36
                        }} >
                            <Text style={[styles.inputCode]}>
                                { this.props.shoulSelectIndex == true ? selectedIndex >= 0 && this.props.items && this.props.items.length > 0 && this.props.items[selectedIndex].value : this.props.value }
                                {/* { this.props.value } */}
                                {/* {this.props.items && this.props.items.length > 0 && this.props.items[selectedIndex].value} */}
                            </Text>
                            <Icon style={{ marginTop: 3, marginRight: 13 }} name="chevron-thin-down" size={13} color="#46763a" />
                        </View>
                    </TouchableOpacity>

                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}>

                    <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', flex: 1 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ ...this.state, modalVisible: false })}>

                        </TouchableOpacity>
                        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                            <Navbar>
                                <NavbarItem />
                                <NavbarItem />
                                <NavbarItem>
                                    <TouchableOpacity onPress={() => this.setState({ ...this.state, modalVisible: false })}>
                                        <Text style={{ color: '#46763a',fontFamily:'Rubik' }}>Done</Text>
                                    </TouchableOpacity>
                                </NavbarItem>
                            </Navbar>
                            <Picker style={{ width: '100%', height: 180, backgroundColor: '#fff' }}
                                selectedValue={selectedIndex}
                                itemStyle={{ color: "black", fontSize: 26 }}
                                onValueChange={(index) => {
                                    if (this.props.onChange && this.props.items && this.props.items.length > 0) {
                                        this.props.onChange(
                                            this.props.items[index].value,
                                            this.props.items[index].id,
                                            index
                                        );
                                    }
                                }}>
                                {this.props.items && this.props.items.map((item, i) => (
                                    <PickerItem label={item.value} value={i} key={i} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    title: {
        paddingTop: 20,
        fontSize: 14,
        lineHeight: 16,
        fontFamily:'Rubik'
    },
    subtitle: {
        fontSize: 12,
        color: '#9B9B9B',
        fontFamily:'Rubik'
    },
    line: {
        marginTop: 5,
        padding: 2,
        fontSize: 14,
        color: '#9B9B9B',fontFamily:'Rubik'
    },
    input: {
        textAlign: 'center',
        color: '#4a4a4a',
        fontSize: 14,
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#E6E5E4',
        height: 36,fontFamily:'Rubik'
    },
    inputCode: {
        paddingLeft: 13,
        textAlign: 'center',
        color: '#4a4a4a',
        fontSize: 14,fontFamily:'Rubik'
    }
})

