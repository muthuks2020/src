import { authorize, refresh, revoke } from 'react-native-app-auth';
import { Buffer } from 'buffer';
import axios from "axios"
import { AsyncStorage, Alert } from 'react-native'

import { LoadScreen } from '../utils/AppTor';
import {
    API_URI,
    FORECAST_URI,
    ISSUER,
    CLIENT_ID,
    REDIRECT_URL,
    SCOPES,
    LOGGED_IN,
    GET_USER,
    GET_COMPANIES,
    GET_BERRIES,
    ADD_BERRY,
    DELETE_BERRY
} from '../utils/constant'
import i18n from '../utils/i18n';

const config = {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUrl: REDIRECT_URL,
    additionalParameters: {},
    scopes: SCOPES,
    dangerouslyAllowInsecureHttpRequests: true
};

export function login() {

    return async dispatch => {
        try {
            const authState = await authorize(config);
            let user;
            if (authState.idToken) {
                const jwtBody = authState.idToken.split('.')[1];
                const base64 = jwtBody.replace('-', '+').replace('_', '/');
                const decodedJwt = Buffer.from(base64, 'base64');
                user = JSON.parse(decodedJwt);
                // AsyncStorage.setItem("@token", authState.idToken, (err) => {
                //     if(err) alert("Something went wrong")
                // })
            }
            dispatch({
                type: LOGGED_IN,
                payload: {
                    refreshToken: authState.refreshToken,
                    idToken: authState.idToken,
                    aud: user.aud,
                    email: user.email,
                    name: user.name,
                }
            })
            //await AsyncStorage.setItem("@token", authState.accessToken)
            axios
                .get(`${API_URI}/users/getUserDetails?login=${user.email}`)
                .then(user => {
                    const { profile } = user.data
                    console.log("User details ", profile)
                    dispatch({
                        type: GET_USER,
                        payload: {
                            //user: user.data.profile,
                            id: user.data.id,
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            email: profile.email,
                            jobTitle: profile.jobTitle,
                            language: profile.preferredLanguage,
                            phone: profile.primaryPhone,
                            secondaryPhone: profile.secondaryPhone,
                            country: profile.country,
                            persona: profile.persona,
                            isModalOpen: false
                        }
                    })
                    AsyncStorage.setItem("UserDetailsStored", "true", (err) => {
                        console.log("Error saving userdetails ", err)
                        if (profile && profile.persona === "Ranch Planner") {
                            profile.primaryPhone ? LoadScreen('MainScreen', {}, true) : LoadScreen('ProfileSetupScreen', {}, true);
                        } else {
                            LoadScreen("LoginScreen")
                            Alert.alert(i18n.t("noAccess"), i18n.t("noPermission"));
                        }
                    })
                })
                .catch(err => {
                    console.log("Login ", err);

                })

        } catch (error) {
            console.log("Error Login", error);

        }
    }
}

export function logOut(oktaId) {
    return dispatch => {
        // axios
        //     .post(`${API_URI}/users/endAllSession?oktaId=${oktaId}`)
        //     .then(data=>{
        LoadScreen("LoginScreen")
        // })
    }

}

export function getUser(userEmail) {
    return dispatch => {
        axios
            .get(`${API_URI}/users/getUserDetails?login=${userEmail}`)
            .then(user => {
                const { profile } = user.data
                dispatch({
                    type: GET_USER,
                    payload: {
                        id: user.data.id,
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        email: profile.email,
                        jobTitle: profile.jobTitle,
                        language: profile.preferredLanguage,
                        phone: profile.primaryPhone,
                        secondaryPhone: profile.secondaryPhone,
                        country: profile.country,
                        persona: profile.persona,
                        isModalOpen: false
                    }
                })
            })
            .catch(err => {

            })
    }

}

export function getCompanies(userId, personaid) {
    return dispatch => {
        axios
            //.get(`${API_URI}/users/getUserDetails?login=${userEmail}`)
            .get(`${FORECAST_URI}/users/ranches?personaid=5&useroktaid=${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": 'Basic MG9hOXBhZTBmeUh4TUdlUWQzNTY6bEo4WWh2OWJUUnhTYzU2VTR6UElTSUpzTS1rc3R0TkZwWjVfU2lmcg=='
                    }
                })
            .then(companies => {
                // console.log("CMPNY", JSON.stringify(companies));
                if (companies.data.ConversionUnits[0])
                    this.addBerry({ berryTypeId: companies.data.ConversionUnits[0].BerryTypeCode, berryType: companies.data.ConversionUnits[0].BerryTyepName, unitType: companies.data.ConversionUnits[0].Unit }).then(() => {
                        if (companies.data.ConversionUnits[1])
                            this.addBerry({ berryTypeId: companies.data.ConversionUnits[1].BerryTypeCode, berryType: companies.data.ConversionUnits[1].BerryTyepName, unitType: companies.data.ConversionUnits[1].Unit }).then(() => {
                                if (companies.data.ConversionUnits[2])
                                    this.addBerry({ berryTypeId: companies.data.ConversionUnits[2].BerryTypeCode, berryType: companies.data.ConversionUnits[2].BerryTyepName, unitType: companies.data.ConversionUnits[2].Unit }).then(() => {
                                        if (companies.data.ConversionUnits[3])
                                            this.addBerry({ berryTypeId: companies.data.ConversionUnits[3].BerryTypeCode, berryType: companies.data.ConversionUnits[3].BerryTyepName, unitType: companies.data.ConversionUnits[3].Unit })
                                    }
                                    )
                            }

                            )
                    }
                    )
                dispatch({
                    type: GET_COMPANIES,
                    payload: companies.data
                })

            })
            .catch(err => {
                console.log("ERROR getcompanies", err);

            })
    }

}

export function updateBerry(berry) {
    console.log("Berry ### " + JSON.stringify(berry))
    console.log("Berry type ### ", berry.berryTypeId)
    var berries = []
    return async dispatch => {
        try {
            berry.unitType.startsWith("T") || berry.unitType.startsWith("t") ? berry.unitType = "Crates" : berry.unitType
            await AsyncStorage.getItem("asBerries", (err, result) => {
                if (result !== null) {
                    var objArray = JSON.parse(result)
                    var index = objArray.findIndex(x => x.berryTypeId == berry.berryTypeId)
                    if (index === -1) {
                        objArray.push(berry)
                        console.log("Added new item to array ### ", objArray)
                        AsyncStorage.setItem("asBerries", JSON.stringify(objArray), (err) => {
                            console.log("Error saving berry ### " + err)
                        })
                    } else {
                        console.log("Index ### ", index)
                        console.log("Stored unit ", objArray[index].unitType)
                        console.log("new unit ", berry.unitType)
                        if (objArray[index].unitType != berry.unitType) {
                            objArray[index].unitType = berry.unitType
                        console.log("object updated ### ", JSON.stringify(objArray))
                        AsyncStorage.setItem("asBerries", JSON.stringify(objArray), (err) => {
                            console.log("Error saving berry ### " + err)
                        })
                        }
                    }
                } else {
                    berries.push(berry)
                    console.log("Berries to update 3 ", JSON.stringify(berries))
                    AsyncStorage.setItem("asBerries", JSON.stringify(berries), (err) => {
                        console.log("Error saving berry ### " + err)
                    })
                }
            })
        } catch (error) {
            console.log("Error adding berry to local", err);
        }
    }
}

export function addBerry(berry) {
    var berries = []
    return async dispatch => {
        try {
            berry.unitType.startsWith("T") || berry.unitType.startsWith("t") ? berry.unitType = "Crates" : berry.unitType
            await AsyncStorage.getItem("asBerries", (err, result) => {
                if (result !== null) {
                    var objArray = JSON.parse(result)
                    var index = objArray.findIndex(x => x.berryTypeId == berry.berryTypeId)
                    if (index === -1) {
                        objArray.push(berry)
                        console.log("Added new item to array ### ", objArray)
                        AsyncStorage.setItem("asBerries", JSON.stringify(objArray), (err) => {
                            console.log("Error saving berry ### " + err)
                        })
                    }
                } else {
                    berries.push(berry)
                    AsyncStorage.setItem("asBerries", JSON.stringify(berries), (err) => {
                        console.log("Error saving berry ### " + err)
                    })
                }
            })
        } catch (error) {
            console.log("Error adding berry to local", err);
        }
    }
}

// export function addBerry(berry) {
//     console.log("Berry ### " + JSON.stringify(berry))
//     return async dispatch => {
//         try {
//             await AsyncStorage.getItem("@berry", (err, result) => {
//                 console.log("ADD_BERRY", JSON.stringify(result))

//                 let berryList = result ? JSON.parse(result) : [];
//                 console.log("berryList addBerry ### ", JSON.stringify(berryList))
//                 var index = berryList.findIndex(x => x.berryTypeId == berry.berryTypeId)
//                 // here you can check specific property for an object whether it exist in your array or not
//                 berry.unitType.startsWith("T") || berry.unitType.startsWith("t") ? berry.unitType = "Crates" : berry.unitType
//                 // if (index === -1){
//                 //     berryList.push(berry)
//                 // }
//                 // else{
//                 //     berryList[index]=berry
//                 // }//berry.id = new Date().valueOf();
//                 //berryList.push(berry)
//                 console.log("berry addBerry ### ", JSON.stringify(berry))
//                 AsyncStorage.setItem("@berry", JSON.stringify(berryList), (err) => {
//                     // dispatch({
//                     //     type: ADD_BERRY,
//                     //     payload: berry
//                     // })
//                 })
//             })
//         } catch (error) {
//             console.log("Error adding berry to local", err);

//         }
//     }

// }

export function getBerries() {
    AsyncStorage.getItem("asBerries", (err, results) => {
        if (results !== null) {
            var objArray = JSON.parse(results)
            return objArray
        }
    })
}

// export function getBerries() {
//     return dispatch => {

//         AsyncStorage.getItem("@berry", (err, results) => {
//             console.log("GET_BERRY ", results)
//             if (err) {
//             }
//             dispatch({
//                 type: GET_BERRIES,
//                 payload: results ? JSON.parse(results) : [],
//             })
//         })
//     }
// }

export function deleteBerry(id) {
    return dispatch => {
        AsyncStorage.getItem("@berry", (err, result) => {
            let berryList = JSON.parse(result);
            let newBerryList = berryList.filter(item => item.id !== id)
            AsyncStorage.setItem("@berry", JSON.stringify(newBerryList), () => {
                dispatch({
                    type: DELETE_BERRY,
                    payload: id
                });
            })
        })
    }
}