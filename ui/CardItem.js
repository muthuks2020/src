import React, { Component } from 'react';

import {
    View,
    Switch,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import  {ISO_BAR_ICON_COLOR} from '../utils/style';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CardItem extends Component {
    render() {
        return (
           <View  style={[styles.container, this.props.first && {borderTopLeftRadius:4, borderTopRightRadius:4,width:'100%'}
           , this.props.last && {borderBottomLeftRadius:4, borderBottomRightRadius:4},  !this.props.last && {borderBottomColor:'#fff'} ]}>
         
                <View style={{flexDirection:'row', alignItems:'center',width:this.props.switch == undefined?"100%":"80%"}}>
                    {this.props.check != undefined &&
                    <Image style={{ display:this.props.check==-1?"none":'flex', height:15, width:15, marginRight:10}} resizeMode={'cover'} 
                            source={
                                this.props.check==0?
                                    require('../source/red.png')
                                    :this.props.check==1?
                                        require('../source/blue.png')
                                        :this.props.check==2&&
                                            require('../source/green.png')
                                            }/>}
                    <View style={{display:this.props.check==-1?"flex":'none',height:15, width:15, marginRight:10}}></View>
          
                    <View style={{width:'80%',marginRight:2}}>
                        <Text style={{fontFamily:'Rubik',fontSize:14, color:'#4a4a4a'}}>{this.props.title} </Text>
                        {this.props.subtitle != undefined &&  
                        <Text style={{fontFamily:'Rubik',marginTop:12.5,fontSize:12,color:'#4a4a4a'}}>{this.props.subtitle}</Text>}
                    </View>
                    {
                        this.props.link != undefined && 
                        <View style={{width:this.props.check == undefined ?"20%":"15%",alignSelf:"flex-end"}}>
                            <TouchableOpacity onPress={()=>{if(this.props.onLink) this.props.onLink()}}>
                                <View style={{flexDirection:'row',width:80,alignItems:"center",justifyContent:'center',alignSelf:'center',marginLeft:5,marginRight:this.props.showArrow?40:0}}>
                                    <Text style={{fontFamily:'Rubik',fontSize:13, color:'#007aff',marginRight:5}}>{this.props.link}</Text>
                                    <Icon style={{display:this.props.showArrow?"flex":"none"}} name="ios-arrow-forward"  size={24} color={"#007aff"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
           </View>
            {this.props.switch != undefined && <CustomSwitch onValueChange ={this.props.onValueChange} checked={this.props.checked || false}/>}
        </View>
        )
    }
}

class CustomSwitch extends Component{
    
    state = {
        checked:this.props.checked
    }

    render(){
       return(
        <Switch value={this.props.checked} onValueChange={(value) => 
        this.props.onValueChange?
        this.props.onValueChange(): 
        this.setState({checked:value})}/>
       )
    }
}


const styles = StyleSheet.create({
    container: {
        borderColor: '#e9e9e9',
        borderWidth: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection:'row',
    flex:1,
    flexWrap:"wrap"
    },
    text:{
        fontSize:18,
        fontWeight: '500'
    }
})

