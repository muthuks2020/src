import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'

import i18n from '../utils/i18n'
import { LoadScreen, Page, PageContent, Navbar, NavbarItem, Icon } from '../utils/AppTor';
import { TitleBlock, Button, CardItem } from '../ui';
import * as actions from '../actions/profile'

class ProfileSettingCompaniesScreen extends Component {

  state={
    isLoading:true,
    massAlert:"",
    dailyAlert:""
  }
  componentDidMount() {
    const { user } = this.props
    this.props.getCompanies(user.id);
    AsyncStorage.getItem('massAlert').then((massAlert) => {
      AsyncStorage.getItem('dailyAlert').then((dailyAlert) => {
        this.setState({
          massAlert:massAlert,
          dailyAlert:dailyAlert,
          isLoading: false
        });
      });
      
    });
  }

  render() {

    const { companies } = this.props
    const  companiesArr  = companies.RanchPlannerAssignment
    if(!this.state.isLoading)
    {
      return (
        <Page>

          {/* This will show a loading indicator  */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={false}
            onRequestClose={() => {
              //this.setState({ isModalOpen: false })
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


          <Navbar>
            <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")}/>
            <NavbarItem title={i18n.t("profileSetup")} />
            <NavbarItem />
          </Navbar>
          <PageContent>
            <TitleBlock>{i18n.t('assignedCompanies')}</TitleBlock>
            <View style={{ marginTop: 30 }}>

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
          </PageContent>
          {/* <Button onPress={() => LoadScreen('ProfileSettingScreenTerms',{ 
              isDailyAlert:companies.Alerts[0].hasOwnProperty("DailyAlert")?
                companies.Alerts[0].DailyAlert==1?
                  true
                  :false
                  :this.state.dailyAlert!=null?
                  this.state.dailyAlert=="true"?
                    true
                    :false
                :true, 
                
              isMassAlert:companies.Alerts[0].hasOwnProperty("MassAlert")?
                companies.Alerts[0].MassAlert==1?
                  true
                  :false
                :this.state.massAlert!=null?
                  this.state.massAlert=="true"?
                    true
                    :false
                  :true 

            })} yellow>{i18n.t("next")}</Button> */}

            <Button onPress={() => LoadScreen('ProfileSettingScreenTerms',{
              isDailyAlert:
                this.state.dailyAlert!=""?
                  this.state.dailyAlert=="false"?
                  false
                  :true
                :true,
              
                
              isMassAlert:
                this.state.massAlert!=""?
                  this.state.massAlert=="false"?
                    false
                    :true
                  :true ,
              
              userOktaId:
              this.props.user.id

            })} yellow>{i18n.t("next")}</Button>
        </Page>
      );
    }
    else{
      return(
        <Page>
          <Text>Loading..</Text>
        </Page>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    companies: state.profile.companies,
    user: state.profile.user
  }
}

export default connect(mapStateToProps, actions)(ProfileSettingCompaniesScreen)


