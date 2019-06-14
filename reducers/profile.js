import {
    LOGGED_IN,
    GET_USER,
    GET_COMPANIES,
    GET_BERRIES,
    ADD_BERRY_RED,
    UPDATE_BERRY,
    DELETE_BERRY,
    UPDATE_USER,
    USER_LOGOUT
} from '../utils/constant'


export default function (state = {
    user: {},
    loggedUser: {},
    berryList: [],
    companies: {}
}, action) {
//     console.log("Action ", action)
//   console.log("Action payload ", action.payload)
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                loggedUser: action.payload,
                loggedIn: true
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                getUserFailed: false
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                updateUserFailed: false
            }
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload,
                getCompaniesFailed: false,
                getCompaniesSuccess: true
            }
        case ADD_BERRY_RED:
            const existsInArray = state.berryList.filter(l => l.berryTypeId === action.payload.berryTypeId)
            if (existsInArray.length > 0) {
                return state;
            }
            return {
                ...state,
                berryList: [...state.berryList, action.payload],
                addBerryFailed: false
            }
        case UPDATE_BERRY:
            return {
                ...state,
                berryList: state.berryList.map(berry => berry.berryTypeId === action.payload.berryTypeId ?
                    { ...berry, unitType: action.payload.unitType } :
                    berry
                )
            };
        case GET_BERRIES:
            return {
                ...state,
                berryList: action.payload,
                getBerryFailed: false
            }
        case DELETE_BERRY:
            let berryList = state.berryList;
            let newBerryList = berryList.filter(item => item.id !== action.payload)
            return {
                ...state,
                berryList: newBerryList
            }
        case USER_LOGOUT:
            state = undefined
            return {
                state,
                action
            }
        default:
            return state;
    }
}