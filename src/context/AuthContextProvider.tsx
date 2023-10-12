import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
} from "react";
import authReducer, { AuthState, defaultAuthState } from "./authReducer";
import {  useNavigate } from "react-router-dom";
import { AuthActionEnum } from "./authActions";
import LoginPage from "../components/login/LoginPage";
import SignUpPage from "../components/register/SignUpPage";
import { ENDPOINTS } from "../hooks/endpoint";
import { AuthProviderProps, UserData } from "../types/Types";
import axios from "axios";
import Spinner from "../components/spinner/Spinner";



export interface AuthContext {
  authState: AuthState;
  globalLogInDispatch: (props: UserData) => void;
  globalLogOutDispatch: () => void;
}
// create authentication context
const authContext = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {}
});

export const AuthContextProvider = (props: AuthProviderProps)=>{
    const {children} = props;
    const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const path = window.location.pathname;
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_VITE_API_BASE_URL,
    });
   
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
          const userData: UserData = JSON.parse(user);
          console.log(userData);
          const formData = new URLSearchParams();
          formData.append("token", userData.authToken);
          const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          };
          const validateToken = async () => {
            let response = await axiosInstance.post(ENDPOINTS.VALIDATE_TOKEN,formData.toString(),config);
            console.log(response.data);
            if(response.status === 200){
              console.log("is active : " + response.data.active);
              if(response.data.active) {
                authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData });
                setIsAuthenticated(response.data.active);
              }else{
                navigate("/login");
              }
            }
            else{
              navigate("/login");
            }
            setIsLoading(false);
         };
         validateToken();
        }
        else{
          setIsLoading(false);
        }
      }, [authState.authToken]);

    const globalLogInDispatch = useCallback(
      (props: UserData) => {
        const { authToken, refreshToken, email, name, userId } = props;
        authDispatch({
          type: AuthActionEnum.LOG_IN,
          payload: {
            authToken,
            refreshToken,
            userId,
            name,
            email,
          },
        });
        navigate("/");
        console.log("LOGIN DISPATCH");
        console.log(props);
      },
      [navigate]
  );
  const globalLogOutDispatch = useCallback(() => {
      authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null });
      navigate("/login");
  }, [navigate]);
  const context = {
      authState,
      globalLogInDispatch,
      globalLogOutDispatch
  };
  if(isLoading){
    return(
      <Spinner />
    )
  }
  return (
    <authContext.Provider value={context}>
      {isAuthenticated?children:(path==="/signup"?<SignUpPage />:<LoginPage />)}
    </authContext.Provider>)
}
export default authContext;