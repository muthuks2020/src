import React, { Component } from 'react';
import {
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { PhoneNumberUtil } from 'google-libphonenumber'
import axios from 'axios'

import { LoadScreen, Page, PageContent, Navbar, NavbarItem, Icon } from '../utils/AppTor';
import { TitleBlock, ItemValue, ItemPhone, RadioItems, ItemSelect, Button } from '../ui';
import { API_URI } from '../utils/constant'
import * as actions from '../actions/profile'
import i18n from '../utils/i18n'

const JOBS = [
  { id: 1, value: "Grower Owner" },
  { id: 2, value: "President" },
  { id: 3, value: "Production Assistant" },
  { id: 4, value: "Ranch Assistant" },
  { id: 5, value: "Ranch Foreman" },
  { id: 6, value: "Ranch Manager" },
  { id: 7, value: "Truck Driver" },
  { id: 8, value: "Controller/Accountant" },
  { id: 9, value: "Other" },
]
class ProfileSetupScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      secondaryPhone: '',
      isPrimaryPhoneError: false,
      isSecondaryPhoneError: false,
      language: 'English',
      jobTitle: 'Grower Owner',
      jobTitleIndex:0,
      isSubmitting: false,
      user: {}
    }
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        user: props.user,
        jobTitle: props.user.jobTitle,
        phone: props.user.phone,
        secondaryPhone: props.user.secondaryPhone ? props.user.secondaryPhone : "",
        language: props.user.language,
        jobTitleIndex : JOBS.findIndex(i => i.value == props.user.jobTitle)
      }
    }
    return null
  }

  //Get the primary phone number value
  onPhoneNumnberChange(phone) {
    this.setState({ phone, isPrimaryPhoneError: false })
  }

  //Get the secondary phone number value
  onSecondaryPhoneNumnberChange(phone) {
    this.setState({ secondaryPhone: phone, isSecondaryPhoneError: false })
  }

  //Get the selected language
  onLanguageChange(language) {
    let lang = language === "English" ? "en" : "es"
    i18n.locale = lang
    this.setState({ language })
  }

  //Get the selected job title
  onJobTitleChange(jobTitle,id, jobTitleIndex) {
    this.setState({ jobTitle,jobTitleIndex })
  }

  //this will validate the phone number
  validatePhoneNumber(phone, type) {
    let error = true
    const phoneUtil = PhoneNumberUtil.getInstance();
    //check inseted value is more than 3 
    if (phone && phone.length > 3) {
      try {
        let number = phoneUtil.parseAndKeepRawInput(phone);
        //Check whether the entered value is a phone number
        let isPossible = phoneUtil.isPossibleNumber(number);
        if (isPossible) {
          //take the country code of the phone number
          let regionCode = phoneUtil.getRegionCodeForNumber(number)
          //Check whether phone number is valid for selected country code
          if (!phoneUtil.isValidNumber(number, regionCode)) {
            error = true
          } else {
            error = false
          }
        } else {
          error = true
        }
      } catch (err) {
        error = true
      }
     

  

    }
    this.setState({
      [type]: error
    })
    return error;
  }

  //This will get the user infromation form the server
  getUserDetails() {
    axios
      .get(`${API_URI}/users/getUserDetails?login=${this.props.loggedUser.email}`)
      .then(user => {
        console.log("User details ### " + JSON)
        this.setState({
          user: user.data.profile,
          language: user.data.profile.preferredLanguage,
          phone: user.data.profile.primaryPhone,
          secondaryPhone: user.data.profile.secondaryPhone,
          isModalOpen: false
        })
      })
      .catch(err => {
        Alert.alert("Error", "Something went wrong", [
          { text: "OK", onPress: () => { this.setState({ isModalOpen: false }) } }
        ])
      })
  }

  //This will submit profile information to server
  submit() {
    const { phone, secondaryPhone } = this.state
    if (!this.validatePhoneNumber(phone, "isPrimaryPhoneError") && 
      (secondaryPhone.length < 5  || !this.validatePhoneNumber(secondaryPhone, "isSecondaryPhoneError"))) {
      this.setState({ isSubmitting: true })
      axios.post(`${API_URI}/users/updateUser`, {
        login: this.props.loggedUser.email,
        preferredLanguage: this.state.language,
        primaryPhone: this.state.phone,
        secondaryPhone:  this.state.secondaryPhone.length < 5 ? "" : this.state.secondaryPhone,
        jobTitle: this.state.jobTitle
      })
        .then(async data => {
          let lang = this.state.language === "English" ? "en" : "es"
          try {
            await AsyncStorage.setItem("@language", lang);
            i18n.locale = lang
          } catch (error) {
            i18n.locale = "en"
          }

          LoadScreen('ProfileSettingCompaniesScreen')
          this.setState({ isSubmitting: false })
        })
        .catch(err => {
          this.setState({ isSubmitting: false })
          Alert.alert("Error", "Something went wrong", [
            { text: "OK" }
          ])
        })

    }

  }

  render() {
    const { user } = this.state
    return (
      <Page>
        <Navbar>
          <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")}/>
          <NavbarItem title={i18n.t("profileSetup")} />
        <NavbarItem />
        </Navbar>
        <PageContent>
          <TitleBlock>{i18n.t("personalInformation")}</TitleBlock>

          <View style={{ marginTop: 30, flexDirection: 'row' }}>
            <ItemValue style={{ flex: 1 }} label={i18n.t('firstName')} value={user && user.firstName && user.firstName} />
            <ItemValue style={{ flex: 1 }} label={i18n.t('lastName')} value={user && user.firstName && user.lastName} />

          </View>

          <ItemPhone
            input
            style={{ marginTop: 30 }}
            error={this.state.isPrimaryPhoneError}
            value={this.state.phone}
            label={i18n.t('primaryPhoneNumber')} 
            onChange={this.onPhoneNumnberChange.bind(this)}
          />
          <ItemPhone
            input
            style={{ marginTop: 30 }}
            error={this.state.isSecondaryPhoneError}
            value={this.state.secondaryPhone}
            label={i18n.t('secondaryPhoneNumber')} 
            onChange={this.onSecondaryPhoneNumnberChange.bind(this)}
          />
          <ItemValue
            style={{ marginTop: 30 }}
            label={i18n.t('email')} 
            value={user && user.email && user.email}
          />
          <ItemValue
            style={{ marginTop: 30 }}
            label={i18n.t('country')} 
            value={user && user.country && user.country}
          />
          <RadioItems
            style={{ marginTop: 30 }}
            label={i18n.t('preferredLanguage')} 
            radios={['English', 'Spanish']}
            value={this.state.language}
            onChange={this.onLanguageChange.bind(this)}
          />
          <ItemSelect
            shoulSelectIndex={ true }
            style={{ marginTop: 30, marginBottom: 100 }}
            label={i18n.t('jobTitle')} 
            selectedIndex={this.state.jobTitleIndex}
            onChange={this.onJobTitleChange.bind(this)}
            items={JOBS}
          />

        </PageContent>
        <Button 
          onPress={() => this.submit()} 
          //onPress={() =>  LoadScreen('ProfileSettingCompaniesScreen')} 
          yellow 
          disabled={this.state.isSubmitting}>{i18n.t("next")}</Button>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedUser: state.profile.loggedUser,
    user: state.profile.user
  }
}

export default connect(mapStateToProps, actions)(ProfileSetupScreen)


