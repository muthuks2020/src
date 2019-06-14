import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import Picker from 'react-native-wheel-picker';
import { Navbar, NavbarItem } from '../utils/AppTor';
import Icon from 'react-native-vector-icons/dist/Entypo';
import i18n from '../utils/i18n'

var PickerItem = Picker.Item;
const elementStyles = StyleSheet.create({
  container: {
    width: '100%'
  },
  title: {
    paddingTop: 20,
    fontSize: 14,
    lineHeight: 16
  },
  subtitle: {
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily:'Rubik'
  },
  input: {
    color: '#4a4a4a',
    fontSize: 14,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E6E5E4',
    textAlign: 'right',
    height: 36
  },
  line: {
    marginTop: 5,
    padding: 2,
    fontSize: 14,
    color: '#9B9B9B',
  },
  inputCode: {
    paddingLeft: 3,
    textAlign: 'center',
    color: '#4a4a4a',
    fontSize: 14,
    width: 65,
    fontFamily:'Rubik'
  }
});

export class RenterInputText extends Component {

    render() {
        const { input, style, number=false, ...inputProps} = this.props;
        return (
          <View style={[elementStyles.container, this.props.style]}>
            {this.props.label ? <Text style={elementStyles.subtitle}>{this.props.label}</Text>: null}
            <TextInput 
              {...inputProps}
              keyboardType={number? "number-pad": "default"}
              returnKeyType='done'
              onChangeText={(value) => {
                let number = Number(value);
                if(isNaN(number)) {
                  number = 0;
                }
                input.onChange(number);
              }}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              value={input.value.toString()}
              style={{ ...elementStyles.input}} 
            /> 
          </View>
        )
    }
};

export class RenderSelect extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      selectedIndex: props.input.value
    }
  }

  componentDidUpdate() {
    const { selectedIndex } = this.state;
    const { disabled } = this.props;

    if(disabled && selectedIndex != 0) {
      this.setState({
        selectedIndex: 0
      })
    }
  }

  render() {
    const { input, disabled, ...inputProps} = this.props;

    return (
      <View style={[elementStyles.container, this.props.style]}>
        <Text style={elementStyles.subtitle}>{this.props.label}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => {this.setState({ ...this.state, modalVisible: true })}} >
              <View style={{
                  justifyContent: 'space-between', alignItems: 'center', width: '90%', marginTop: 14, flexDirection: 'row', borderWidth: 1,
                  borderRadius: 4,
                  borderColor: '#E6E5E4',
                  minHeight:36
              }} >
                <Text style={[elementStyles.inputCode]}>
                    {(this.props.items && this.props.items[this.state.selectedIndex] && 
                      this.props.items[this.state.selectedIndex].value) === ""? "-": this.props.items[this.state.selectedIndex] && this.props.items[this.state.selectedIndex].value}
                </Text>
                <Icon style={{ marginTop: 3, marginRight: 10 }} name="chevron-thin-down" size={13} color="#46763a" />
              </View>
            </TouchableOpacity>
          </View>


          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>

              <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', flex: 1 }}>
                <TouchableOpacity 
                  style={{ flex: 1 }} 
                  onPress={() => this.setState({ ...this.state, modalVisible: false })} 
                />

                <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                  <Navbar>
                    <NavbarItem />
                    <NavbarItem />
                    <NavbarItem>
                      <TouchableOpacity onPress={() => this.setState({ ...this.state, modalVisible: false })}>
                        <Text style={{ color: '#46763a',fontFamily:'Rubik' }}>{i18n.t("done")}</Text>
                      </TouchableOpacity>
                    </NavbarItem>
                  </Navbar>

                  <Picker style={{ width: '100%', height: 180, backgroundColor: '#fff' }}
                    selectedValue={input.value==="" ? 0 : input.value}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    itemStyle={{ color: "black", fontSize: 26 }}
                    onValueChange={(event) => {
                      input.onChange(event);
                      this.setState({ selectedIndex: event });
                    }}>
                    {this.props.items.map((item, i) => (
                        <Picker.Item label={item.value === ""? "-": item.value} value={i} key={i}/>
                    ))}
                  </Picker>
                </View>
              </View>
          </Modal>
      </View>
    )
  }
};
