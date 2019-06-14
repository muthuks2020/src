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
import { PhoneNumberUtil } from 'google-libphonenumber'

const phoneUtil = PhoneNumberUtil.getInstance();

const codes = [
    { label: 1, value: 1 },

    { label: 7, value: 7 },

    { label: 20, value: 20 },
    { label: 27, value: 27 },
    { label: 30, value: 30 },
    { label: 31, value: 31 },
    { label: 32, value: 32 },
    { label: 33, value: 33 },
    { label: 34, value: 34 },
    { label: 36, value: 36 },
    { label: 39, value: 39 },
    { label: 40, value: 40 },
    { label: 41, value: 41 },
    { label: 43, value: 43 },
    { label: 44, value: 44 },
    { label: 45, value: 45 },
    { label: 46, value: 46 },
    { label: 47, value: 47 },

    { label: 48, value: 48 },
    { label: 49, value: 49 },
    { label: 51, value: 51 },
    { label: 52, value: 52 },
    { label: 53, value: 53 },
    { label: 54, value: 54 },
    { label: 55, value: 55 },
    { label: 56, value: 56 },
    { label: 57, value: 57 },
    { label: 58, value: 58 },
    { label: 60, value: 60 },
    { label: 61, value: 61 },


    { label: 62, value: 62 },
    { label: 63, value: 63 },
    { label: 64, value: 64 },

    { label: 65, value: 65 },
    { label: 66, value: 66 },
    { label: 81, value: 81 },
    { label: 82, value: 82 },
    { label: 84, value: 84 },
    { label: 86, value: 86 },
    { label: 90, value: 90 },
    { label: 91, value: 91 },
    { label: 92, value: 92 },
    { label: 93, value: 93 },
    { label: 94, value: 94 },
    { label: 95, value: 95 },
    { label: 98, value: 98 },
    { label: 211, value: 211 },
    { label: 212, value: 212 },

    { label: 213, value: 213 },
    { label: 216, value: 216 },
    { label: 218, value: 218 },
    { label: 220, value: 220 },
    { label: 221, value: 221 },
    { label: 222, value: 222 },
    { label: 223, value: 223 },
    { label: 224, value: 224 },
    { label: 225, value: 225 },
    { label: 226, value: 226 },
    { label: 227, value: 227 },
    { label: 228, value: 228 },
    { label: 229, value: 229 },
    { label: 230, value: 230 },
    { label: 231, value: 231 },
    { label: 232, value: 232 },
    { label: 233, value: 233 },
    { label: 234, value: 234 },
    { label: 235, value: 235 },
    { label: 236, value: 236 },
    { label: 237, value: 237 },
    { label: 238, value: 238 },
    { label: 239, value: 239 },
    { label: 240, value: 240 },
    { label: 241, value: 241 },
    { label: 242, value: 242 },
    { label: 243, value: 243 },
    { label: 244, value: 244 },
    { label: 245, value: 245 },
    { label: 246, value: 246 },
    { label: 248, value: 248 },
    { label: 249, value: 249 },
    { label: 250, value: 250 },
    { label: 251, value: 251 },
    { label: 252, value: 252 },
    { label: 253, value: 253 },
    { label: 254, value: 254 },
    { label: 255, value: 255 },
    { label: 256, value: 256 },
    { label: 257, value: 257 },
    { label: 258, value: 258 },
    { label: 260, value: 260 },
    { label: 261, value: 261 },
    { label: 262, value: 262 },

    { label: 263, value: 263 },
    { label: 264, value: 264 },
    { label: 265, value: 265 },
    { label: 266, value: 266 },
    { label: 267, value: 267 },
    { label: 268, value: 268 },
    { label: 269, value: 269 },
    { label: 290, value: 290 },
    { label: 291, value: 291 },
    { label: 297, value: 297 },
    { label: 298, value: 298 },
    { label: 299, value: 299 },
    { label: 350, value: 350 },
    { label: 351, value: 351 },
    { label: 352, value: 352 },
    { label: 353, value: 353 },
    { label: 354, value: 354 },
    { label: 355, value: 355 },
    { label: 356, value: 356 },
    { label: 357, value: 357 },
    { label: 358, value: 358 },
    { label: 359, value: 359 },
    { label: 370, value: 370 },
    { label: 371, value: 371 },
    { label: 372, value: 372 },
    { label: 373, value: 373 },
    { label: 374, value: 374 },
    { label: 375, value: 375 },
    { label: 376, value: 376 },
    { label: 377, value: 377 },
    { label: 378, value: 378 },
    { label: 379, value: 379 },
    { label: 380, value: 380 },
    { label: 381, value: 381 },
    { label: 382, value: 382 },
    { label: 383, value: 383 },
    { label: 385, value: 385 },
    { label: 386, value: 386 },
    { label: 387, value: 387 },
    { label: 389, value: 389 },
    { label: 420, value: 420 },
    { label: 421, value: 421 },
    { label: 423, value: 423 },
    { label: 500, value: 500 },
    { label: 501, value: 501 },
    { label: 502, value: 502 },
    { label: 503, value: 503 },
    { label: 504, value: 504 },
    { label: 505, value: 505 },
    { label: 506, value: 506 },
    { label: 507, value: 507 },
    { label: 508, value: 508 },
    { label: 509, value: 509 },
    { label: 590, value: 590 },

    { label: 591, value: 591 },
    { label: 592, value: 592 },
    { label: 593, value: 593 },
    { label: 595, value: 595 },
    { label: 597, value: 597 },
    { label: 598, value: 598 },
    { label: 599, value: 599 },

    { label: 670, value: 670 },
    { label: 672, value: 672 },
    { label: 673, value: 673 },
    { label: 674, value: 674 },
    { label: 675, value: 675 },
    { label: 676, value: 676 },
    { label: 677, value: 677 },
    { label: 678, value: 678 },
    { label: 679, value: 679 },
    { label: 680, value: 680 },
    { label: 681, value: 681 },
    { label: 682, value: 682 },
    { label: 683, value: 683 },
    { label: 685, value: 685 },
    { label: 686, value: 686 },
    { label: 687, value: 687 },
    { label: 688, value: 688 },
    { label: 689, value: 689 },
    { label: 690, value: 690 },
    { label: 691, value: 691 },
    { label: 692, value: 692 },
    { label: 850, value: 850 },
    { label: 852, value: 852 },
    { label: 853, value: 853 },
    { label: 855, value: 855 },
    { label: 856, value: 856 },
    { label: 880, value: 880 },
    { label: 886, value: 886 },
    { label: 960, value: 960 },
    { label: 961, value: 961 },
    { label: 962, value: 962 },
    { label: 963, value: 963 },
    { label: 964, value: 964 },
    { label: 965, value: 965 },
    { label: 966, value: 966 },
    { label: 967, value: 967 },
    { label: 968, value: 968 },
    { label: 970, value: 970 },
    { label: 971, value: 971 },
    { label: 972, value: 972 },
    { label: 973, value: 973 },
    { label: 974, value: 974 },
    { label: 975, value: 975 },
    { label: 976, value: 976 },
    { label: 977, value: 977 },
    { label: 992, value: 992 },
    { label: 993, value: 993 },
    { label: 994, value: 994 },
    { label: 995, value: 995 },
    { label: 996, value: 996 },
    { label: 998, value: 998 }
]

export default class ItemPhone extends Component {
    state = {
        modalVisible: false,
        code: '+1',
        selectedCode: 0,
        numberBox1:'',
        numberBox2:'',
        isError:false
    }

    static getDerivedStateFromProps(props, state){
        const { value } = props;
        if(props.value && props.value !== `${state.code}${state.numberBox1}${state.numberBox2}`){
            let regionCode
            try {

                let number = phoneUtil.parseAndKeepRawInput(props.value);
                //Check whether the entered value is a phone number
                let isPossible = phoneUtil.isPossibleNumber(number);
                if(isPossible){
                    //take the country code of the phone number
                    regionCode = number.getCountryCode()
                }
                let phoneCodeArray = props.value.split(`+${regionCode}`) 

                if(phoneCodeArray.length === 2){
                    let code =  `+${regionCode}`
                    let numberBox1 = phoneCodeArray[1].substr(0,3)
                    let numberBox2 = phoneCodeArray[1].substr(3)
                    let selectedCode = codes.findIndex(c => c.value == regionCode)
                    return{
                        code,
                        numberBox1,
                        numberBox2,
                        selectedCode
                    }
                }
                
            } catch (error) {
                
            }
           
            
          
            return null;
           
        }

        return null
    }

    render() {
        const { error } = this.props
        const { code, numberBox1, numberBox2 } = this.state
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.subtitle}>{this.props.label}</Text>
                {this.props.input && 
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity 
                        onPress={() => this.setState({ ...this.state, modalVisible: true })}>
                            <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                width: 60,
                                marginTop:8, 
                                flexDirection:'row', 
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: error ? '#ff6363' : '#E6E5E4',
                                //borderColor: '#E6E5E4',
                                height: 36
                            }} >
                                <Text style={[styles.inputCode]}>+{codes[this.state.selectedCode].label}</Text>
                                <Icon style={{marginTop: 3, marginLeft:3}} name="chevron-thin-down" size={13} color="#46763a"/>
                                </View>
                        </TouchableOpacity>

                        <Text style={styles.line}>-</Text>
                        <TextInput 
                            keyboardType={'number-pad'} 
                            style={[styles.input, { width: 60, borderColor: error ? '#ff6363' : '#E6E5E4', }]} 
                            value={this.state.numberBox1}
                            maxLength={3}
                            onChangeText={(value)=>{
                                let number = `${code}${value}${numberBox2}`
                                this.props.onChange(number)
                                this.setState({ ...this.state, numberBox1: value })}
                            }
                        />
                        <Text style={styles.line}>-</Text>
                        <TextInput 
                            keyboardType={'number-pad'} 
                            style={[styles.input, { width: 122, borderColor: error ? '#ff6363' : '#E6E5E4', }]} 
                            value={this.state.numberBox2}
                            onChangeText={(value) => {
                                let number = `${code}${numberBox1}${value}`
                                this.props.onChange(number)
                                this.setState({ ...this.state, numberBox2: value })}
                            }
                          
                        />
                        
                    </View>
                    {this.props.error && <Text style={{top:5,color:'#ff6363'}}>Phone number is not valid</Text>}
                </View>
                
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}>

                    <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', flex: 1 }}>
                    <TouchableOpacity style={{flex:1}}  onPress={() => this.setState({ ...this.state, modalVisible: false })}>

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
                                selectedValue={this.state.selectedCode}
                                itemStyle={{ color: "black", fontSize: 26 }}
                                onValueChange={(index,value) => {
                                    let number = `+${codes[index].label}${numberBox1}${numberBox2}`
                                    this.props.onChange(number)
                                    this.setState({ selectedCode: index, code:`+${codes[index].label}` })
                                }}>
                                {codes.map((value, i) => (
                                    <PickerItem label={'+' + value.label} value={i} key={i} />
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
        textAlign: 'center',
        color: '#4a4a4a',
        fontSize: 14 ,fontFamily:'Rubik'
    }
})

