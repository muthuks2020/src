import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Analytics from '@aws-amplify/analytics';

import { Tabbar } from '../ui';
import HomeTab from './Tabs/HomeTab';
import ForecastTab from './Tabs/ForecastTab';
import ProfileTab from './Tabs/ProfileTab';
import OrdersTab from './Tabs/OrdersTab';
import AccuracyTab from './Tabs/AccuracyTab';
import { Page } from '../utils/AppTor';
import * as forecastActions from '../actions/forcast';
import * as orderActions from  '../actions/orders';


class MainScreen extends Component {

    async componentDidMount() {
        const { id } = this.props.user
        let token = await AsyncStorage.getItem("@pushnotiToken")
        Analytics.updateEndpoint({
            address: token,
            OptOut: 'NONE',
            userId: `${id}`
        }).then(data => {
            //console.log(data)
        }).catch(error => {
            //console.log(error)
        });

        this.props.getRanches(id);
        //this.props.getOrders(id, today);
    }

    //This will redirect to the tab
    goToPage(pageId) {
        this.tabView.goToPage(pageId);
    }

    render() {
        
        return (
            <Page>
                <ScrollableTabView
                    locked={true}
                    ref={(tabView) => { this.tabView = tabView; }}
                    tabBarPosition={'bottom'}
                    renderTabBar={() => <Tabbar />}
                >
                    <HomeTab goToPage={this.goToPage.bind(this)} />
                    <ForecastTab />
                    <OrdersTab />
                    <AccuracyTab />
                    <ProfileTab />

                </ScrollableTabView>
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
      user: state.profile.user,
      forecast: state.forecast
    }
  }
  
export default connect(mapStateToProps, { ...forecastActions, ...orderActions})(MainScreen)



