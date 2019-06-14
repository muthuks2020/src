import React from 'react';
import { Provider } from "react-redux";
import { AsyncStorage, Platform, Alert, PushNotificationIOS } from 'react-native'
import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { Scene, Router, Actions, Drawer, Stack } from 'react-native-router-flux';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';

import Amplify from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';

import NavbarItem from './ui/NavbarItem';
import Icon from './ui/Icon';
import Page from './ui/Page';
import PageContent from './ui/PageContent';
import Navbar from './ui/Navbar';
import TabItem from './ui/TabItem';
import Tabbar from './ui/Tabbar';

import { reducer as formReducer } from "redux-form";
import { reducer as networkReducer } from "react-native-offline";
import profileReducer from "../reducers/profile";
import orderReducer from "../reducers/order";
import forecastReducer from "../reducers/forecast";
import companyReducer from "../reducers/company";
import toastReducer from "../reducers/toast";

import config from '../../aws-exports'

import { ReduxNetworkProvider, createNetworkMiddleware } from 'react-native-offline';
import { EDIT_FORCAST, GET_FORECASTS, GET_RANCHES, GET_COMPANIES_2, GET_ORDERS, GET_ORDER_DETAILS, EDIT_FORCAST2, EDIT_FORCAST3 } from './constant';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { NetworkProvider } from 'react-native-offline';

import OfflineNotice from './OfflineNotice'


const PERSIST = true;

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['form', 'toast']
};

const networkPersistConfig = {
    key: 'network',
    storage,
    blacklist: ['isConnected']
}

const reducers = combineReducers({
    profile: profileReducer,
    form: formReducer,
    network: persistReducer(networkPersistConfig, networkReducer),
    orders: orderReducer,
    forecast: forecastReducer,
    company: companyReducer,
    toast: toastReducer
});

const pReducer = PERSIST ? persistReducer(persistConfig, reducers) : reducers;

const initialState = {};

const network = createNetworkMiddleware({
    actionTypes: [EDIT_FORCAST, EDIT_FORCAST2, EDIT_FORCAST3],
    queueReleaseThrottle: 50,
});

const middlewares = [network, reduxThunk];

//const store = createStore(pReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
const store = createStore(pReducer, initialState, applyMiddleware(...middlewares));

const persistor = persistStore(store);

const AppInit = (data) => {
    console.log("screens ", data.screens)
    console.log("init screen ", data.screen)
    console.disableYellowBox = true;
    const uniqueId = DeviceInfo.getUniqueID();
    Amplify.configure({
        // To get the AWS Credentials, you need to configure 
        // the Auth module with your Cognito Federated Identity Pool
        Auth: {
            identityPoolId: config.aws_cognito_identity_pool_id,
            region: config.aws_cognito_region//'us-east-1'
        },
        Analytics: {
            // OPTIONAL - disable Analytics if true
            disabled: false,
            // OPTIONAL - Allow recording session events. Default is true.
            autoSessionRecord: false,

            AWSPinpoint: {
                // OPTIONAL -  Amazon Pinpoint App Client ID
                appId: config.aws_mobile_analytics_app_id,
                // OPTIONAL -  Amazon service region
                region: config.aws_cognito_region,//'us-east-1',
                // OPTIONAL -  Customized endpoint
                endpointId: `${uniqueId}`,
                // OPTIONAL - Default Endpoint Information
                endpoint: {
                    address: `${uniqueId}`, // The unique identifier for the recipient. For example, an address could be a device token, email address, or mobile phone number.
                    //optOut: 'ALL'
                },
                bufferSize: 1000,
                flushInterval: 5000, // 5s 
                flushSize: 100,
                resendLimit: 5
            }
        }
    });
    PushNotification.configure(config);
    // get the notification data when notification is received
    PushNotification.onNotification((notification) => {
        // Note that the notification object structure is different from Android and IOS
        console.log('in app notification', notification);
        if (Platform.OS == "android") {
            Alert.alert(notification.title, notification.body)
        }
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        if (Platform.OS == "ios") {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
    });

    // get the registration token
    PushNotification.onRegister((token) => {
        console.log('in app registration', token);
        AsyncStorage.setItem("@pushnotiToken", token)

    });

    // get the notification data when notification is opened
    PushNotification.onNotificationOpened((notification) => {
        console.log('the notification is opened', notification);
    });

    return App = () => {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NetworkProvider>
                        {/* <OfflineNotice/> */}
                        <Router>
                            <Stack key="root">
                                {_.map(data.screens, (name, key) => {
                                    // console.log("Name ", name)
                                    // console.log("Key ", key)
                                    return <Scene initial={key == data.initScreen ? true : false} hideNavBar key={key} component={name} />
                                })}
                            </Stack>
                        </Router>
                    </NetworkProvider>
                </PersistGate>
            </Provider>
        )
    }
}

const goBack = () => {
    Actions.pop();
}
const goHome = () => {
    Actions.reset("MainScreen")
}
const openSwipeMenu = () => {
    Actions.drawerOpen("drawer");
}

const closeSwipeMenu = () => {
    Actions.drawerClose("drawer");
}

const LoadScreen = (screen, props, main) => {
    if (!main)
        Actions.push(screen, props || {});
    else
        Actions.reset(screen, props || {});

    Actions.drawerClose();
}

export {
    AppInit,
    LoadScreen,
    goBack,
    goHome,
    openSwipeMenu,
    closeSwipeMenu,
    Page,
    PageContent,
    Navbar,
    NavbarItem,
    Icon,
    Tabbar,
    TabItem
}

