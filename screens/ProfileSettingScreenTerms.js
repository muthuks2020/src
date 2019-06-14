import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  ScrollView,
  Alert, 
  Linking,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FORECAST_URI} from '../utils/constant';

import axios from 'axios';
import i18n from '../utils/i18n'
import { LoadScreen, Page, PageContent, Navbar, NavbarItem } from '../utils/AppTor';
import { TitleBlock, ItemSelect, Button, CardItem, TitleLine, CheckBox, Block } from '../ui';
import * as actions from '../actions/profile'

// const AddedItem = ({ berry, units, onDel }) => {
//   return <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
//     <Text style={{fontFamily:'Rubik', flex: 1, color: '#4a4a4a', paddingLeft: 13, fontSize: 12 }}>{berry}</Text>
//     <Text style={{fontFamily:'Rubik', flex: 1, color: '#4a4a4a', paddingLeft: 13, fontSize: 12 }}>{units}</Text>
//     <TouchableOpacity onPress={() => onDel()} >
//       <Icon name="ios-remove-circle-outline" size={20} color="#900" />
//     </TouchableOpacity>
//   </View>
// }

const { width, height } = Dimensions.get('screen')

class ProfileSettingScreenTerms extends Component {

  constructor(props) {
    super(props)
     this.state = {
      berryLists: [],
      unitsList: [
        { id: 1, value: "Crates" },
        { id: 2, value: "Pounds(Lbs)" },
        { id: 3, value: "Kilos(Kgs)" }
      ],
      //selectedIndex: 0, //for berrytype
      unitTypeIndex1: 0,
      unitType1: "Crates",
      unitTypeId1: 0,
      unitTypeIndex2: 0,
      unitType2: "Crates",
      unitTypeId2: 0,
      unitTypeIndex3: 0,
      unitType3: "Crates",
      unitTypeId3: 0,
      unitTypeIndex4: 0,
      unitType4: "Crates",
      unitTypeId4: 0,
      // berryType: 'Blackberry',
      // berryTypeId: 1,
      //selectedBerryList: [],
      list: [],
      index:0,
      modalVisible: false,
      aggreed : false,
      isMassAlert:this.props.isMassAlert,
      isDailyAlert:this.props.isDailyAlert
    }
   // this.onBerryTypeChange = this.onBerryTypeChange.bind(this)
   this.onUnitChange1 = this.onUnitChange1.bind(this)
   this.onUnitChange2= this.onUnitChange2.bind(this)
   this.onUnitChange3 = this.onUnitChange3.bind(this)
   this.onUnitChange4= this.onUnitChange4.bind(this)
   this.onValueChangeMassAlert= this.onValueChangeMassAlert.bind(this)
   this.onValueChangeDailyAlert= this.onValueChangeDailyAlert.bind(this)
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.selectedBerryList && nextProps.selectedBerryList != state.selectedBerryList) {
      let newlist = []

      nextProps.selectedBerryList.forEach(element => {
        newlist.push({
          id: element.berryTypeId,
          value: element.berryType
        })
      });

      let list = _.differenceBy(state.berryList, newlist, "id")
      let berryType;
      let berryTypeId;
      let selectedIndex;
      if (list.length > 0) {
        berryType = list[0].value;
        berryTypeId = list[0].id;
        selectedIndex = 0
      }

      return {
        selectedBerryList: nextProps.selectedBerryList,
        list,
        berryType,
        berryTypeId,
        selectedIndex
      }
    }
    return null;
  }

  componentDidMount() {
    AsyncStorage.getItem("asBerries", (err, results) => {
      if (results !== null) {
        const array = JSON.parse(results)
        console.log("Get array of berries ", array)
        console.log("Get array of berries first ", array[0])
        this.setState({
          berryLists: array,
          unitType1: 
            array[0] != null ? 
            array[0].unitType.startsWith("C")?
              this.state.unitsList[0].value
              :array[0].unitType.startsWith("L")?
                this.state.unitsList[1].value 
                : array[0].unitType.startsWith("K")?
                this.state.unitsList[2].value
                : "Crates":"Crates",
          unitTypeIndex1: this.state.unitsList.findIndex(item => item.value == (array[0] != null ? array[0].unitType : "Crates")),
          unitType2: 
          array[1] != null ? 
          array[1].unitType.startsWith("C")?
            this.state.unitsList[0].value
            :array[1].unitType.startsWith("L")?
              this.state.unitsList[1].value 
              : array[1].unitType.startsWith("K")?
              this.state.unitsList[2].value
              : "Crates":"Crates",
          unitTypeIndex2: this.state.unitsList.findIndex(item => item.value == (array[1] != null  ? array[1].unitType : "Crates")),
          unitType3: 
          array[2] != null ? 
          array[2].unitType.startsWith("C")?
            this.state.unitsList[0].value
            :array[2].unitType.startsWith("L")?
              this.state.unitsList[1].value 
              : array[2].unitType.startsWith("K")?
              this.state.unitsList[2].value
              : "Crates":"Crates",
          unitTypeIndex3: this.state.unitsList.findIndex(item => item.value == (array[2] != null  ? array[2].unitType : "Crates")),
          unitType4: 
          array[3] != null ? 
          array[3].unitType.startsWith("C")?
            this.state.unitsList[0].value
            :array[3].unitType.startsWith("L")?
              this.state.unitsList[1].value 
              : array[3].unitType.startsWith("K")?
              this.state.unitsList[2].value
              : "Crates":"Crates",
          unitTypeIndex4: this.state.unitsList.findIndex(item => item.value == (array[3] != null  ? array[3].unitType : "Crates"))
        })
      }
  })
   // this.props.addBerry();
   // this.props.getBerries()
  }

  // onBerryTypeChange(value, id, selectedIndex) {
  //   this.setState({ ...this.state, berryType: value, berryTypeId: id, selectedIndex })
  // }

  onUnitChange1(value, id, unitTypeIndex1) {
    this.setState({ ...this.state, unitType1: value, unitTypeId1: id, unitTypeIndex1 })
  }
  onUnitChange2(value, id, unitTypeIndex2) {
    this.setState({ ...this.state, unitType2: value, unitTypeId2: id, unitTypeIndex2 })
  }
  onUnitChange3(value, id, unitTypeIndex3) {
    this.setState({ ...this.state, unitType3: value, unitTypeId3: id, unitTypeIndex3 })
  }
  onUnitChange4(value, id, unitTypeIndex4) {
    this.setState({ ...this.state, unitType4: value, unitTypeId4: id, unitTypeIndex4 })
  }

  onValueChangeMassAlert () {
    this.setState({
      isMassAlert:!this.state.isMassAlert
    },()=>{
      AsyncStorage.setItem("massAlert", this.state.isMassAlert.toString());
    });   
  }
  onValueChangeDailyAlert(){
    this.setState({
      isDailyAlert:!this.state.isDailyAlert
    },()=>{
      AsyncStorage.setItem("dailyAlert", this.state.isDailyAlert.toString());
    })
  }

  register(){
    // let cu=this.props.selectedBerryList;
    // console.log("Selected berry list ", this.props.selectedBerryList)
    // console.log("Unit type 1 ### ", this.state.unitType1)
    // console.log("Unit type 2 ### ", this.state.unitType2)
    // const cu=this.removeDuplicates(this.props.selectedBerryList,"berryType")
    const cu = this.state.berryLists
    // console.log("berry list ", this.state.berryLists)
    // console.log("berry list count ### " + cu.length)
    // console.log("index 0 " + JSON.stringify(cu[0]))
    // console.log("index 1 " + JSON.stringify(cu[1]))
    // console.log("index 2 " + JSON.stringify(cu[2]))
    // console.log("index 3 " + JSON.stringify(cu[3]))

    cu[0]&&this.props.updateBerry({ berryTypeId:cu[0].berryTypeId, berryType: cu[0].berryType, unitType: this.state.unitType1 })
    cu[1]&&this.props.updateBerry({ berryTypeId:cu[1].berryTypeId, berryType: cu[1].berryType, unitType: this.state.unitType2 })
    cu[2]&&this.props.updateBerry({ berryTypeId:cu[2].berryTypeId, berryType: cu[2].berryType, unitType: this.state.unitType3 })
    cu[3]&&this.props.updateBerry({ berryTypeId:cu[3].berryTypeId, berryType: cu[3].berryType, unitType: this.state.unitType4 })
  //  LoadScreen('MainScreen');
    //    
    //API to save thwe updated data
    AsyncStorage.getItem('status').then((statusArr) => {
      ranches=[]
        if(statusArr){
        jsonStatusArr=JSON.parse(statusArr);
        jsonStatusArr.forEach(ranch => {
          obj={}
          obj["RanchStatus"]=ranch["status"]
          obj["RanchNumber"]=ranch["code"]
          ranches.push(obj);
        })
      }
      bodyJson={
        "RanchPlannerProfileRequest": {
        "UserOktaId": this.props.userOktaId,
        "Ranches": ranches,
        "ConversionUnits": [
          // {
          //   "BerryTyepName": "Blueberry",
          //   "Unit": "Lbs"
          // },
          // {
          //   "BerryTyepName": "Raspberry",
          //   "Unit": "Kgs"
          // }
        ],
        "Alerts": {
          "DailyAlert": this.state.isDailyAlert,
          "MassAlert": this.state.isMassAlert
        }
      }
  }
      axios({ 
        method: 'PUT', 
        url: `${FORECAST_URI}/users/ranchplannerprofile`, 
        headers: 
        {
          'Content-Type': 'application/json',
          "Authorization": 'Basic MG9hOXBhZTBmeUh4TUdlUWQzNTY6bEo4WWh2OWJUUnhTYzU2VTR6UElTSUpzTS1rc3R0TkZwWjVfU2lmcg=='
        },
        data: bodyJson
      })
      .then(data => {
        if(data.status==201||data.status==200){
          //LoadScreen('MainScreen');
        }
        LoadScreen('MainScreen');
        
      })
      .catch(err => {
          console.log("Error Profile update",err);
      })
    
    })
  
  }
  // onUnitChange(value, id, unitTypeIndex) {
  //   index=this.index;
  //   unitType=this.state.unitType; 
  //   unitType[index]=value;

  //   unitTypeId=this.state.unitTypeId; 
  //   unitTypeId[index]=id;

  //   unitTypeIndex= this.state.unitTypeIndex
  //   unitTypeIndex[index]=unitTypeIndex

  //   this.setState({ ...this.state, unitType: unitType, unitTypeId: unitTypeId, unitTypeIndex:unitTypeIndex })
  // }

  // onDel(id) {
  //   this.props.deleteBerry(id)
  // }

  addItem() {
    let cu=this.props.conversionUnits;
    for(i=0;i<cu.length;i++){
      this.props.addBerry({ berryTypeId:cu.BerryTypeCode, berryType: cu.BerryTyepName, unitType: cu.Unit })
    }
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }

  render() {
    const { list } = this.state;
    // const bl=this.removeDuplicates(this.props.selectedBerryList,"berryType")
   const bl = this.state.berryLists
   console.log("bl ### ", bl)
     const url= "https://s3.us-east-2.amazonaws.com/gpastaticfiles/faq.pdf";
    return (
      <Page>
        <Navbar>
          <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")}/>
          <NavbarItem title={i18n.t("profileSetup")} />
          <NavbarItem />
        </Navbar>
        <PageContent noPadding>
          <Block>
            <TitleBlock>{i18n.t("mySettings")}</TitleBlock>
          </Block>
          <TitleLine>{i18n.t("alerts")}</TitleLine>
          <View style={{ margin: 20 }}>
            <CardItem first title={'Mass Alerts'} switch 
            onValueChange={()=>{this.onValueChangeMassAlert()}} checked={this.state.isMassAlert}></CardItem>
            <CardItem last title={'Daily Alerts'} switch 
            onValueChange={()=>this.onValueChangeDailyAlert()} checked={this.state.isDailyAlert}></CardItem>
          </View>
          <TitleLine style={{alignItems:"center"}}><Text style={{fontFamily:'Rubik',flex:1,width:"100%"}}>{"  "}{i18n.t("berryType")}</Text>{"\t \t \t \t  "} <Text style={{fontFamily:'Rubik',flex:1,width:"100%"}}>{i18n.t("conversionUnits")} </Text></TitleLine>
          <Block>
          {/* <FlatList
          data={this.props.conversionUnits}
          renderItem={({item}) => <Text style={styles.berryContent}>{item.key}</Text>}
        /> */}
          {/* {this.props.conversionUnits.map((conversionUnit, index) => {
           */}
            {/* return( */}
              {bl[0]&&
           
              <View style={{ flexDirection: 'row',alignItems:"center",justifyContent:"space-between" }}>
                <View style={styles.berryContent}>
                  <Text style={styles.berryStyle}>{bl[0].berryType}</Text>
                </View>
              
              <ItemSelect
                selectedIndex={this.state.unitTypeIndex1}
                value={this.state.unitType1}
                onChange={this.onUnitChange1}
                style={{ flex: 1 }}
                items={this.state.unitsList}
              />
            
            </View>
            }
            {bl[1]&&
            <View style={{ flexDirection: 'row',alignItems:"center",justifyContent:"space-between" }}>
                <View style={styles.berryContent}>
                  <Text style={styles.berryStyle}>{bl[1].berryType}</Text>
                </View>
              
              <ItemSelect
                selectedIndex={this.state.unitTypeIndex2}
                value={this.state.unitType2}
                onChange={this.onUnitChange2}
                style={{ flex: 1 }}
                items={this.state.unitsList}
              />
            
            </View>}

            {bl[2]&&<View style={{ flexDirection: 'row',alignItems:"center",justifyContent:"space-between" }}>
                <View style={styles.berryContent}>
                  <Text style={styles.berryStyle}>{bl[2].berryType}</Text>
                </View>
              
              <ItemSelect
                selectedIndex={this.state.unitTypeIndex3}
                value={this.state.unitType3}
                onChange={this.onUnitChange3}
                style={{ flex: 1 }}
                items={this.state.unitsList}
              />
            
            </View>}

            {bl[3]&&<View style={{ flexDirection: 'row',alignItems:"center",justifyContent:"space-between" }}>
                <View style={styles.berryContent}>
                  <Text style={styles.berryStyle}>{bl[3].berryType}</Text>
                </View>
              
              <ItemSelect
                selectedIndex={this.state.unitTypeIndex4}
                value={this.state.unitType4}
                onChange={this.onUnitChange4}
                style={{ flex: 1 }}
                items={this.state.unitsList}
              />
            
            </View>}
            {/* ) */}
          {/* })} */}
          
            {/* <View>
              {this.props.selectedBerryList.map((item, index) => {
                return <AddedItem berry={item.berryType} units={item.unitType} onDel={() => this.onDel(item.id)} />
              })}
            </View> */}
          </Block>
          <Block>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20
            }}>
              <View style={{ flexDirection: 'row', marginLeft: 5 }}>
              <CheckBox style={{marginTop:5}}
                onChange={(value) => { this.setState({aggreed:value}) }}
              />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{fontFamily:'Rubik', color: '#4a4a4a' }}>
                    {i18n.t("agreeDriscolls")}
                  </Text>
                  {/* <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }}> */}
                  <TouchableOpacity onPress={() => { Linking.openURL(url).catch(err => console.error('An error occurred', err)); }}>
                    <Text style={{fontFamily:'Rubik', color: '#4186bf' }}>
                    {i18n.t("terms")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{fontFamily:'Rubik', color: '#4a4a4a' }}>{i18n.t("deDriscoll")}</Text>
                </View>
              </View>
            </View>
          </Block>

          {/* This will show a loading indicator  */}
          </PageContent>
        <Button onPress={() => {
          if(this.state.aggreed){
            this.register();
          } else {
            Alert.alert( i18n.t("terms"), i18n.t("plAgree"))
          }
        }} yellow>
          {i18n.t("register")}
        </Button>
      </Page>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  link: {
    color: '#007aff',
    fontSize: 12
  },
  linkContent: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  berryContent:{
    flex:1,marginTop:10, justifyContent:'center'
  },
  berryStyle:{
    flex:1,
    fontFamily:'Rubik'
  }
});

function mapStateToProps(state) {
  return {
    selectedBerryList: state.profile.berryList
  }
}

export default connect(mapStateToProps, actions)(ProfileSettingScreenTerms)


