import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import ProfileSettingCompaniesScreen from './screens/ProfileSettingCompaniesScreen';
import ProfileSettingRanchesScreen from './screens/ProfileSettingRanchesScreen';
import ProfileSettingScreenTerms from './screens/ProfileSettingScreenTerms';
import FAQScreen from './screens/Tabs/FAQScreen';
import MainScreen from './screens/MainScreen';
import TodayTab from './screens/Tabs/TodayTab';
import OrderDetail from './screens/Tabs/OrderDetail'
import { AppInit } from './utils/AppTor';

export default AppInit({
  initScreen: "LoadingScreen",
  screens: {
    LoadingScreen,
    LoginScreen,
    MainScreen,
    ProfileSetupScreen,
    ProfileSettingScreenTerms,
    ProfileSettingCompaniesScreen,
    ProfileSettingRanchesScreen,
    TodayTab,
    OrderDetail,
    FAQScreen
  }
});
