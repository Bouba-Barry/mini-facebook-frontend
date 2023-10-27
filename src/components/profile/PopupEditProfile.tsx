import { useForm } from "react-hook-form";
import { PopupEditUserProps, updateUserInput } from "../../types/profile/Types";
import "../../styles/PopupEditProfile.css"
import FormHeader from "../addPost/FormHeader";

const PopupEditProfile = (props: PopupEditUserProps) => {
    const {register, handleSubmit} = useForm<updateUserInput>();
    
    const onSubmit = (data: updateUserInput) => {
        props.updateUser(props.user.id, data);
        props.handlePopup();
    }

    return(      
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 
    flex justify-center items-center">
        <div className="p-6 pt-4 mb-4 pb-2 w-1/2 bg-white dark:bg-black rounded shadow-md">
            <FormHeader  closePopupClick={props.handlePopup} title="Edit Your Profile"/>
             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">    
                <div className="mb-3">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input id="firstName" defaultValue={props.user.firstName} {...register("firstName")} className="block w-full bg-black text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="text" />
                </div>  
                <div className="mb-3">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">last Name</label>
                    <input id="lastName" defaultValue={props.user.lastName} {...register("lastName")} className="block w-full bg-black text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="text" />
                </div> 
                 <div className="mb-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                    <input id="email" defaultValue={props.user.email} {...register("email")} className="block w-full bg-black text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="email" />
                </div>  

                <div className="mb-3">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input id="location" defaultValue={props.user.location} {...register("location")} placeholder="Marrakech, Sidi Abbad" className="block w-full bg-black text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="text" />
                </div>       
                <div className="grid justify-items-end">
                    <button className= "mt-1 mr-1 bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full" type="submit">
                        Update
                    </button>
                </div>
            </form> 
            
        </div>
    </div>
    )

    
}
export default PopupEditProfile;