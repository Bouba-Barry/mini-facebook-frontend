import { Reducer } from "react";
import { AuthAction } from "./authActions";

export interface AuthState {
    isLoggedIn : boolean;
    authToken?: string;
    refreshToken?: string;
    userId?: string;
    name?: string;
    email?: string;
};
export const defaultAuthState: AuthState = {
    isLoggedIn: false,
};
const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
    // login success
    if (action.type === "LOG_IN") {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: true,
        authToken: action.payload.authToken,
        userId: action.payload.userId,
        name: action.payload.name,
        email: action.payload.email,
      };
    }
    if(action.type === "LOG_OUT"){
        localStorage.removeItem("user");
        return defaultAuthState;
    }
    return defaultAuthState;
};

export default authReducer;