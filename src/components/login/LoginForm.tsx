import { useForm } from "react-hook-form";
import ButtonSubmitForm from "../utils/ButtonSubmitForm";
import { useContext, useState } from "react";
import authContext, { AuthContext } from "../../context/AuthContextProvider";
import { useAxios } from "../../hooks/axios/useAxios";
import { LoginInputs } from "../../types/Types";
import {sendLogin} from "../../hooks/login/useLogin";
import Spinner from "../spinner/Spinner";
import Alert from "../alerts/Alert";

export default function LoginForm(){
    const {register, handleSubmit, formState} = useForm<LoginInputs>();
    const authenticationContext = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const onSubmit = async (data: LoginInputs) => {
        setIsLoading(true);
        setError(false);
        try{
            await sendLogin(
                authenticationContext,
                {email:data.email, password:data.password}, setIsLoading, setError);
        }catch(error){
            console.log(error);
        }
    }
    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto mb-12 px-4">
                {error && <Alert title="Error! " message="Incorrect informations"/>}
            <div className="mb-5">
                <input
                    {...register("email", {
                        required:{value: true, message: "Email is required"},
                        pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalide email format"}})
                    }
                    className={`border ${formState.errors.email?`border-red-500`:`border-gray-400`} rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none`}
                    type="email"
                    placeholder="Email"/>
                <span className="text-red-500">{formState.errors.email?.message}</span>
            </div>
            <div className="mb-5">
                <input
                    {...register("password", {
                        required:{value: true, message: "Password is required"},
                    })}
                    className={`border ${formState.errors.password?`border-red-500`:`border-gray-400`} rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none`}
                    type="password" 
                    placeholder="Password"/>
                <span className="text-red-500">{formState.errors.password?.message}</span>
            </div>
            <div
                className="mb-8">
                    <a href="#" 
                       className="text-gray-500 hover:underline dark:text-blue-500 text-sm font-medium">
                            Forgot Password?
                    </a>
            </div>
            <ButtonSubmitForm        
                textButton={"LOGIN"} loading={isLoading}/>
        </form>
    )
}