import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Text,
  ScrollView,
  AsyncStorage
} from 'react-native';

import i18n from '../../utils/i18n'
import { TitleBlock, CardItem } from '../../ui';
import { PageContent, Navbar, NavbarItem, LoadScreen } from '../../utils/AppTor';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions/forcast';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});



class ForecastTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      statusArr: []
    }
    AsyncStorage.getItem('forecastResponseArr').then((result) => {
      statusArr = JSON.parse(result);
      // console.log("Status Arr ", statusArr)
      //add to state
      this.setState({
        statusArr: statusArr,
        isLoading: false
      })
    })
  }


  render() {
    const ranches = this.props.forecast.ranch.list;
    const loading = this.props.forecast.ranch.loading;
    const firstRanchIndex = 0;
    const lastRanchIndex = ranches.length - 1;

    if (!this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <Navbar>
            <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Menu")} firstTab={true} />
            <NavbarItem title={i18n.t("submitForecast")} />
            <NavbarItem />

          </Navbar>
          <PageContent style={{ paddingLeft: 20, paddingRight: 20, padding: 0 }}>
            <TitleBlock style={{ paddingTop: 20, paddingBottom: 0 }}>{i18n.t("selectRanch")}</TitleBlock>

            <View style={{ marginTop: 20 }}>
              {
                loading ?
                  <ActivityIndicator /> :
                  ranches.length ? _.map(ranches, (ranch, index) => {
                    if (this.state.statusArr) {
                      var flag = -1;
                      for (i = 0; i < this.state.statusArr.length; i++) {
                        if (this.state.statusArr[i].ranch == ranch.Code) {
                          flag = this.state.statusArr[i].status
                          break;
                        }
                      }
                    }

                    return <CardItem
                      key={index}
                      first={firstRanchIndex === index}
                      last={lastRanchIndex === index}
                      showArrow={true}
                      check={flag}
                      title={ranch.Name}
                      subtitle={ranch.Code}
                      link={i18n.t('select')}
                      onLink={() => {
                        if (ranch.PlanningGroups.length > 0) {
                          LoadScreen("TodayTab", { ranch })
                        } else {
                          Alert.alert(i18n.t("errForecast"));
                        }
                      }} />
                  }) : <Text style={{ fontFamily: 'Rubik' }}>{i18n.t("noRanch")}</Text>
              }
            </View>
          </PageContent>
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <Navbar>
            <NavbarItem displayWarning={true} showText={true} backLink={'Back'} backText={i18n.t("Menu")} firstTab={true} />
            <NavbarItem title={i18n.t("submitForecast")} />
            <NavbarItem />
          </Navbar>
        </View>)
    }
  }
}

function mapStateToProps(state) {
  return {
    forecast: state.forecast
  }
};

export default connect(mapStateToProps, actions)(ForecastTab);
