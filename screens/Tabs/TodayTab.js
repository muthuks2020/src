import React, { Component } from 'react';
import { View, Text, Alert, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import moment from "moment";
import { PageContent, Navbar, NavbarItem, Page } from '../../utils/AppTor';
import { Actions } from 'react-native-router-flux';
import { DATE_FORMAT } from '../../utils/constant';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodayPage from './forms/Today';
import TommorowPage from './forms/Tommorow';
import DayAfterTommorowPage from './forms/DayAfterTommorow';
import { ReduxNetworkProvider } from 'react-native-offline';
import * as actions from '../../actions/forcast';
import DateProvider from '../../utils/_DateProvider';
import i18n from '../../utils/i18n'

const threshold = 999999;

class TodayTab extends Component {
  constructor(props) {
    super(props);
    this.onSubmitForecast = this.onSubmitForecast.bind(this)
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.getForcast = this.getForcast.bind(this);
    this.getForecastGroupsWithDefaultValues = this.getForecastGroupsWithDefaultValues.bind(this);
    this.dp = new DateProvider(props.startDate);
    this.state = {
      page: 0
    }
    
  }

  onSubmitForecast(values) {
    Alert.alert(i18n.t('success'), i18n.t('forecastSuccessMsg'), [
      {
        text: 'Ok', 
        onPress: () => {  Actions.reset("MainScreen"); } 
      },
    ],
    {cancelable: false})
  }

  nextPage() {
    const { page } = this.state;
    if(page !== 2 ) {
      this.setState({ page: ++this.state.page  })
    } 
  }

  previousPage() {
    const { page } = this.state;
    if( page !== 0) {
      this.setState({ page: --this.state.page });
    } 
  }

  getForcast(date) {
    const { forecast:{ list } , ranch } = this.props;

    const currentGroups = list.filter( forecast => {
      if(forecast.RanchNumber === ranch.Code && forecast.ForecastDate === date ) {
        return true;
      }
      return false;
    });

    return currentGroups;
  }

  getForecastGroupsWithDefaultValues = (currentGroups) => {
    const { ranch: { PlanningGroups }, forecast: { reasons }} = this.props;
    const defaultValues = {
      Quantity: 0,
      ReasonCodeId: 0
    };

    const groups = PlanningGroups.map( group => {
      const isExist = currentGroups.find( cGroup => cGroup.PlanningGroupNumber === group.PlanningGroupName);

      
      if(!isExist) {
        defaultValues.PlanningGroupNumber = group.PlanningGroupName;
        return defaultValues
      }

      const currentReason = reasons.find( reason => {
        return reason.value === isExist.ReasonCodeName
      });

      
      isExist.ReasonCodeId = currentReason && currentReason.id;
      return isExist;
    })

    return groups;
  };

  componentDidMount() {
    const { Code } = this.props.ranch;
    this.props.getForecasts(this.props.user.id, Code, this.dp.getToday());
  }

  render() {
    const { ranch } = this.props;
    const { page } = this.state;

    const today = this.dp.getToday();
    const tommorow = this.dp.getTommorow();
    const dayAfterTommorow = this.dp.getDayAfterTommorow();
    const dates = this.dp.getDatesAsc();

    const todayForcastGroups =  this.getForecastGroupsWithDefaultValues(this.getForcast(today));
    const tommorowForcastGroups =  this.getForecastGroupsWithDefaultValues(this.getForcast(tommorow));
    const dayAfterTommorowForcastGroups =  this.getForecastGroupsWithDefaultValues(this.getForcast(dayAfterTommorow));

    const { forecast: { list, loading }, network: { isConnected }} = this.props;

    
    return (
      <Page>
        <Navbar>
          <NavbarItem displayWarning={true} showText={true} backLink={'Back'} backText={i18n.t("Back")}/>
          <NavbarItem title={i18n.t("submitForecast")}/>
          <NavbarItem />
        </Navbar>
        <PageContent>
          {
            loading? <ActivityIndicator /> : 
            <React.Fragment>

              {page === 0 && (
                <TodayPage
                  initialValues={{ inputs: todayForcastGroups }}
                  threshold={threshold}
                  onSubmit={this.nextPage}
                  ranch={ranch}
                  date={dates[page]}
                  page={page}
                />
              )}

            {page === 1 && (
                <TommorowPage
                  initialValues={{ inputs: tommorowForcastGroups }}
                  threshold={threshold}
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                  ranch={ranch}
                  date={dates[page]}
                  page={page}
                />
              )}
              {page === 2 && (
                <DayAfterTommorowPage
                  initialValues={{ inputs: dayAfterTommorowForcastGroups }}
                  threshold={threshold}
                  previousPage={this.previousPage}
                  onSubmit={this.onSubmitForecast}
                  ranch={ranch}
                  date={dates[page]}
                  page={page}
                />
              )}
          
            </React.Fragment>
          }
        </PageContent>
        
      </Page>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    network: state.network,
    forecast: state.forecast,
    user: state.profile.user,
  }
};

export default compose(
  connect(mapStateToProps, actions)
)(TodayTab);
