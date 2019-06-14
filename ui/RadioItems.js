import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';


const ItemRadio = ({title,active,setActive})=>{
    return <TouchableOpacity onPress={()=>setActive()} style={{flex:1}}>
    <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Image style={{height:12, width:12}} resizeMode={'cover'} source={active ? require('../source/radioButton.png') : require('../source/radioButtonGray.png')} />
        <Text style={{fontFamily:'Rubik',marginLeft:13, fontSize:14, color:'#4a4a4a'}}>{title}</Text>
    </View>
    </TouchableOpacity>
}


export default class RadioItems extends Component {

    

    constructor(props){
        super(props)
        
        this.state = {
            active:0
        }
    }

    static getDerivedStateFromProps(props, state){
        let radios;
        let index = 0;
        if(props.radios){
            radios = props.radios;
            index = Array.isArray(radios) && radios.indexOf(props.value)
            index = index === -1 ? 0 : index
        }
            
        if(index != state.active){
            return{
                active:index
            }
        }

        return null
       
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.subtitle}>{this.props.label}</Text>
               <View style={{flexDirection:'row', marginTop: 13}}>
                   {
                       this.props.radios.map((item, index) => 
                            <ItemRadio 
                                setActive={()=>{
                                    this.props.onChange(this.props.radios[index])
                                    this.setState({active:index})
                                }} 
                                title={item} 
                                active={ index === this.state.active}  
                            />
                        )
                    }
               </View>
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
        lineHeight: 16,
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
        height: 36
    }
})

