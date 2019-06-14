import React, { Component } from 'react';
import { View, PushNotificationIOS, Platform, Alert } from 'react-native';
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';

import i18n from '../../utils/i18n'
import { MenuItem, Link } from '../../ui';
import { PageContent, Navbar, NavbarItem } from '../../utils/AppTor';
import { LoadScreen } from '../../utils/AppTor';
import * as actions from '../../actions/profile'


class HomeTab extends Component {


  render() {
    const { loggedUser, user } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Navbar>
          <NavbarItem />
          <NavbarItem title={i18n.t("mainMenu")} />
          <NavbarItem>
            <Link onPress={() => {
              this.props.logOut(user.id)
            }}>
              <AntDesign name="logout" color="#4a773c" size={20} />
            </Link>
          </NavbarItem>
        </Navbar>
        <PageContent noPadding style={{paddingLeft:15,paddingRight:15}}>

          <MenuItem
            title={i18n.t("submitForecast")}
            icon={require('../../source/tab2-a.png')}
            onPress={() => { this.props.goToPage(1) }}
          />

          <MenuItem
            title={i18n.t("harvestOrders")}
            icon={require('../../source/tab3-a.png')}
            onPress={() => { this.props.goToPage(2) }}
          />

          <MenuItem
            title={i18n.t("forecastAccuracy")}
            icon={require('../../source/tab4-a.png')}
            onPress={() => { this.props.goToPage(3) }}
          />
          <MenuItem
            title={i18n.t("faqs")}
            icon={require('../../source/faq.png')}
            onPress={() => {LoadScreen("FAQScreen")}}/>

          <MenuItem
            title={i18n.t("myProfile")}
            icon={require('../../source/tab5-a.png')}
            onPress={() => { this.props.goToPage(4) }}
          />
        </PageContent>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedUser: state.profile.loggedUser,
    user: state.profile.user
  }
}

export default connect(mapStateToProps, actions)(HomeTab)

