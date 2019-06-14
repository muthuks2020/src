import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { PageContent, Navbar, NavbarItem, LoadScreen } from '../../utils/AppTor';
import { TitleBlock, Link, ItemValue, CardItem } from '../../ui';
import i18n from '../../utils/i18n'
import * as actions from "../../actions/profile"

const AddedItem = ({ key, berry, units }) => {
  return <View key={key} style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
    <Text style={{ fontFamily: 'Rubik', flex: 1, color: '#4a4a4a', paddingLeft: 13, fontSize: 12 }}>{berry}</Text>
    <Text style={{ fontFamily: 'Rubik', flex: 1, color: '#4a4a4a', paddingLeft: 13, fontSize: 12 }}>{units}</Text>
  </View>
}

class ProfileTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      arrBerryLists: [],
      user: {},
      isModalOpen: true,
      berries:[],
      isLoading:false
    }
  }
  componentWillMount(){
    AsyncStorage.getItem("asBerries", (err, results) => {
      if (results !== null) {
        const array = JSON.parse(results)
        this.setState({
          berries:array,
          isLoading:false
        })
        console.log("Get array of berries ", array)
        console.log("Get array of berries first ", array[0])
      }})
    
  }

  componentDidMount() {
    console.log("componentDidMount ProfileTab")
    const { user, loggedUser } = this.props
    this.props.getUser(loggedUser.email);
    this.props.getCompanies(user.id);
  }

  

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  render() {
    const { user, companies, berryList } = this.props
    // const bl=this.removeDuplicates(berryList, "berryType")
    const companiesArr = companies && companies.RanchPlannerAssignment
    const {berries}=this.state
    if(this.state.isLoading){
      return <View><Text>Loading..</Text></View>
    }
    return (
      <View style={{ flex: 1 }}>
        <Navbar>
          <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")} firstTab={true} />
          <NavbarItem title={i18n.t("profile")} />
          <NavbarItem>
            {/* <Link onPress={() => LoadScreen("ProfileSetupScreen")}><MaterialCommunityIcons name="account-edit" color="#4a773c" size={20} /></Link> */}
            <Link onPress={() => LoadScreen("ProfileSetupScreen")}>{i18n.t("Edit")}</Link>
          </NavbarItem>
        </Navbar>
        <PageContent>

          {/* This will show a loading indicator  */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={false}
            onRequestClose={() => {
              this.setState({ isModalOpen: false })
            }}
          >
            <View style={
              {
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-around',
                backgroundColor: '#00000040'
              }
            }>
              <View style={{
                backgroundColor: '#FFFFFF',
                height: 100,
                width: 100,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
                <ActivityIndicator size='large' />

              </View>
            </View>
          </Modal>
          {/* Modal close */}

          <TitleBlock>{i18n.t("personalInformation")}</TitleBlock>
          <View style={{ marginTop: 30, flexDirection: 'row' }}>
            <ItemValue style={{ flex: 1 }} label={i18n.t("firstName")} value={user && user.firstName && user.firstName} />
            <ItemValue style={{ flex: 1 }} label={i18n.t("lastName")} value={user && user.firstName && user.lastName} />
          </View>
          <ItemValue style={{ marginTop: 30 }} label={i18n.t("primaryPhoneNumber")} value={user && user.phone && user.phone} />
          <ItemValue style={{ marginTop: 30 }} label={i18n.t("secondaryPhoneNumber")} value={user && user.secondaryPhone && user.secondaryPhone} />
          <ItemValue style={{ marginTop: 30 }} label={i18n.t("email")} value={user && user.email && user.email} />
          <ItemValue style={{ marginTop: 30 }} label={i18n.t("country")} value={user && user.country && user.country} />
          <ItemValue style={{ marginTop: 30 }} label={i18n.t("preferredLanguage")} value={user && user.language && user.language} />
          <ItemValue style={{ marginTop: 30, marginBottom: 30 }} label={i18n.t("jobTitle")} value={user && user.jobTitle && user.jobTitle} />

          <TitleBlock>{i18n.t("assignedCompanies")}</TitleBlock>

          <View style={{ marginTop: 30, marginBottom: 20 }}>
            {
              companiesArr && companiesArr.map((company, index) => {
                return (
                  <CardItem
                    first={index === 0}
                    last={index === companiesArr.length - 1}
                    key={company.CompanyId}
                    title={company.CompanyName}
                    subtitle={company.CompanyNumber}
                    link={i18n.t('viewRanches')}
                    onLink={() => { LoadScreen('ProfileSettingRanchesScreen', { ranches: company.Ranches, companyId: company.CompanyId }) }}
                  />
                )
              })
            }
          </View>

          <TitleBlock>{i18n.t("berryTypeConvers")}</TitleBlock>
          <View style={{ marginTop: 20, marginBottom: 100 }}>
            {
              berries && berries.map((item, index) => {
                return <AddedItem key={index} berry={item.berryType} units={item.unitType} />
              })
            }
          </View>
        </PageContent>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedUser: state.profile.loggedUser,
    user: state.profile.user,
    companies: state.profile.companies,
    berryList: state.profile.berryList
  }
}

export default connect(mapStateToProps, actions)(ProfileTab)