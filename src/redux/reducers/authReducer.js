import { GOOGLE_SIGNUP_FAILURE, GOOGLE_SIGNUP_REQ, GOOGLE_SIGNUP_SUCCESS, LOGIN_WITH_EMAIL_FAILURE, LOGIN_WITH_EMAIL_REQ, LOGIN_WITH_EMAIL_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQ, LOGOUT_SUCCESS, SIGNUP_WITH_EMAIL_FAILURE, SIGNUP_WITH_EMAIL_REQ, SIGNUP_WITH_EMAIL_SUCCESS } from "../actions/authAction";

const initState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    emailLoading:false,
    googleLoading:false,
    error:null
};

export const authReducer = (state=initState,action)=>{
    switch(action.type){
        case SIGNUP_WITH_EMAIL_REQ:
            return {...state,emailLoading:true,error:null};
        case SIGNUP_WITH_EMAIL_SUCCESS:
            return {...state,user:action.payload,emailLoading:false,error:null};
        case SIGNUP_WITH_EMAIL_FAILURE:
            return {...state,error:action.payload,emailLoading:false}; 
        case GOOGLE_SIGNUP_REQ:
            return{...state,googleLoading:true};
        case GOOGLE_SIGNUP_SUCCESS:
            return{...state,googleLoading:false,user:action.payload,error:null};
        case GOOGLE_SIGNUP_FAILURE:
            return{...state,googleLoading:false,error:action.payload};
        case LOGOUT_REQ:
            return{...state,error:null};
        case LOGOUT_SUCCESS:
            return{...state,googleLoading:false,emailLoading:false,user:null,error:null};
        case LOGOUT_FAILURE:
            return{...state,emailLoading:false,googleLoading:false,error:action.payload};
        case LOGIN_WITH_EMAIL_REQ:
            return{...state,emailLoading:true,error:null};
        case LOGIN_WITH_EMAIL_SUCCESS:
            return{...state,emailLoading:false,user:action.payload,error:null};
        case LOGIN_WITH_EMAIL_FAILURE:
            return{...state,emailLoading:false,error:action.payload};            
        default:
            return state;
    }
}