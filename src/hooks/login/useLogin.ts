import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from "axios"

const login = async (
    axios: AxiosInstance,
    formData : {email: string, password: string}
    )=>{
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    console.log(form);
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const response = await axios.post(ENDPOINTS.LOGIN, form, config);
    return response;
}

export const sendLogin = ( authenticationContext: AuthContext, formData:{email: string, password:string}, setIsLoading: React.Dispatch<React.SetStateAction<any>>, setError: React.Dispatch<React.SetStateAction<any>>) => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_VITE_API_BASE_URL,
      });
    login(axiosInstance, formData)
    .then(response => {
        console.log(response.data);
        console.log(response.data);
        const authToken = response.data.auth.access_token;
        const refreshToken = response.data.auth.refresh_token;
        const userId = response.data.user.id;
        const name = response.data.user.lastName +" "+ response.data.user.firstName;
        const email = response.data.user.email;
        authenticationContext.globalLogInDispatch({authToken,refreshToken,userId,name,email});
        setIsLoading(false);
    })
    .catch(error =>{
        setError(true)
        setIsLoading(false);
        console.log(error);
    });
}