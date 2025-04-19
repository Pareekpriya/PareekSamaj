import { replace } from "react-router-dom";
import { auth, provider } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const SIGNUP_WITH_EMAIL_REQ = "SIGNUP_WITH_EMAIL_REQ";
export const SIGNUP_WITH_EMAIL_SUCCESS = "SIGNUP_WITH_EMAIL_SUCCESS";
export const SIGNUP_WITH_EMAIL_FAILURE = "SIGNUP_WITH_EMAIL_FAILURE";

export const GOOGLE_SIGNUP_REQ = "GOOGLE_SIGNUP_REQ";
export const GOOGLE_SIGNUP_SUCCESS = "GOOGLE_SIGNUP_SUCCESS";
export const GOOGLE_SIGNUP_FAILURE = "GOOGLE_SIGNUP_FAILURE";

export const LOGIN_WITH_EMAIL_REQ = "LOGIN_WITH_EMAIL_REQ";
export const LOGIN_WITH_EMAIL_SUCCESS = "LOGIN_WITH_EMAIL_SUCCESS";
export const LOGIN_WITH_EMAIL_FAILURE = "LOGIN_WITH_EMAIL_FAILURE";


export const LOGOUT_REQ = "LOGOUT_REQ";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const signupWithEmail = (email,password,navigate,location) => async(dispatch) =>{
    dispatch({type:SIGNUP_WITH_EMAIL_REQ})
     try{
       const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
       const user = userCredentials.user;
       dispatch({type:SIGNUP_WITH_EMAIL_SUCCESS,payload:user})
       localStorage.setItem("user",JSON.stringify(user))
       
       const from = location?.state?.from?.pathname || '/';
       navigate(from,{replace:true});

       console.log("user",user)
     }catch(err){
       dispatch({type:SIGNUP_WITH_EMAIL_FAILURE,payload:err.message});
       console.log("Error in Signup:",err.message);
     }
};


export const googleSignup = (navigate,location) => async(dispatch) =>{
    dispatch({type:GOOGLE_SIGNUP_REQ})
    try{
      const result = await signInWithPopup(auth,provider)
      const user = result.user;
     
      dispatch({type:GOOGLE_SIGNUP_SUCCESS,payload:user});
      localStorage.setItem("user",JSON.stringify(user));
      
      const from = location?.state?.from?.pathname || '/';
      navigate(from,{replace:true});

      console.log("user",user);
    }catch(err){
        dispatch({type:GOOGLE_SIGNUP_FAILURE,payload:err.message});
        console.error("Error in Google Signup:",err.message)
    }
};


export const logOut = (navigate) => async(dispatch) =>{
    dispatch({type:LOGOUT_REQ});
    try{
       const res = await signOut(auth);
       dispatch({type:LOGOUT_SUCCESS});
       localStorage.removeItem("user");
       navigate("/");
    }catch(err){
        dispatch({type:LOGOUT_REQ,payload:err.message});
        console.error("Error in logout:",err.message);
    }
};


export const logIn = (email,password,navigate,location) => async(dispatch) => {
    dispatch({type:LOGIN_WITH_EMAIL_REQ})
    try{
        const userCredentials = await signInWithEmailAndPassword(auth,email,password);
        const user =  userCredentials.user;

        dispatch({type:LOGIN_WITH_EMAIL_SUCCESS,payload:user});
        localStorage.setItem("user",JSON.stringify(user));
        
        const from = location?.state?.from?.pathname || '/';
        navigate(from,{replace:true});

    }catch(err){
        dispatch({type:LOGIN_WITH_EMAIL_FAILURE,payload:err.message})
        console.error("Error in login with email:",err.message);
    }
}


