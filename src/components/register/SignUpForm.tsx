import { useForm } from "react-hook-form";
import ButtonSubmitForm from "../utils/ButtonSubmitForm";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../hooks/endpoint";
import { RegisterInputs } from "../../types/Types";
import axios from "axios";
import {useState} from "react";
import Alert from "../alerts/Alert";

export default function SignUpForm(){
    const {register, handleSubmit, formState, getValues} = useForm<RegisterInputs>();
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_VITE_API_BASE_URL,
      });

      const handleImageUpload = (event : React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.result) {
                    setProfileImage(reader.result.toString());
                }
            };
            reader.readAsDataURL(file);
        }
      };
    const onSubmit = async (data: RegisterInputs) => {
        setIsLoading(true);
        const form = new FormData();
        form.append("firstName", data.firstName);
        form.append("lastName", data.lastName);
        form.append("email", data.email);
        form.append("password", data.password);
        form.append("image", data.image[0]);
        form.append("localisation", data.localisation);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axiosInstance.post(ENDPOINTS.REGISTER,form,config);
        if(response.status === 200){
            console.log(response.data);
            setIsLoading(false);
            setError(false);
            navigate("/login");
        }else{
            setError(true);
        }
    }

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-6 mb-5 max-w-screen-md mx-auto">
                {error && <Alert title="An error occured! " message="Try again"/>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col">
                    <input
                        {...register("firstName", {
                            required:{value: true, message: "First name is required"}
                        })}
                        className={`input-field rounded border ${formState.errors.firstName?`border-red-500`:`border-gray-400`}`}
                        type="text"
                        placeholder="First name"/>
                    <p className="text-red-500">{formState.errors.firstName?.message}</p>
                </div>
                <div className="flex flex-col">
                    <input
                        {...register("lastName", {
                            required:{value: true, message: "Last name is required"},
                        })}
                        className={`input-field rounded border ${formState.errors.lastName?`border-red-500`:`border-gray-400`}`}
                        type="text"
                        placeholder="Last name"/>
                    <p className="text-red-500">{formState.errors.lastName?.message}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col">
                    <input
                        {...register("email", {
                            required:{value: true, message: "Email is required"},
                            pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalide email format"}}
                        )}
                        className={`input-field rounded border ${formState.errors.email?`border-red-500`:`border-gray-400`}`}
                        type="email"
                        placeholder="Email"/>
                    <p className="text-red-500">{formState.errors.email?.message}</p>
                </div>
                <div className="flex flex-col">
                    <input
                        {...register("localisation",{
                            required:{value: true, message: "Localisation is required"},
                        })}
                        className={`input-field rounded border ${formState.errors.localisation?`border-red-500`:`border-gray-400`}`}
                        type="text" 
                        placeholder="Localisation"/>
                    <p className="text-red-500">{formState.errors.localisation?.message}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col">
                    <input
                        {...register("password", {
                            required:{value: true, message: "Password is required"},
                            minLength: {value: 6, message: "Password must be at least 6 characters"}
                        })}
                        className={`input-field rounded border ${formState.errors.password?`border-red-500`:`border-gray-400`}`}
                        type="password"
                        placeholder="Password"/>
                    <p className="text-red-500">{formState.errors.password?.message}</p>
                </div>
                <div className="flex flex-col">
                    <input
                        {...register("confirmPassword",{
                            required: {value: true, message: "Password confirmation is required"},
                            validate: value => value === getValues("password") || 'Passwords not match',
                        })}
                        className={`input-field rounded border ${formState.errors.password?`border-red-500`:`border-gray-400`}`}
                        type="password"
                        placeholder="confirm password"/>
                    <p className="text-red-500">{formState.errors.confirmPassword?.message}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col">
                    <div className="mb-3 md:mr-3">
                        <label htmlFor="profileImage" className="block text-gray-500 font-medium mb-1">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            className="p-2 text-transparent"
                            {...register("image")}
                            onChange={handleImageUpload}
                        />
                        {profileImage &&
                        <div className="mb-3">
                            <img
                                src={profileImage}
                                alt="Image Profile"
                                className="w-16 h-16 border border-gray-500 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-full"
                            />
                        </div>}
                    </div>
                </div>
            </div>
            
            <ButtonSubmitForm textButton={"SIGN UP"} loading={isLoading}/>
        </form>
    )
}