import "../../styles/PopupEditProfile.css"
import { PopupProfileProps } from "../../types/profile/Types";
import FormHeader from "../addPost/FormHeader";

const PopupPictureProfile = (props: PopupProfileProps) => {

    return(
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 
    flex justify-center items-center">
        <div className="p-6 pt-4 mb-4 pb-2 bg-white dark:bg-black rounded shadow-md">
            <FormHeader closePopupClick={props.handlePopup} title=""/>
            <form onSubmit={props.submitProfileChange} className="flex flex-col">            
            <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload image</label>
            <input onChange={props.handleFileChange}  accept="image/*" className="block w-full bg-black text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help"></div>
            </div>
            <div className="grid justify-items-end">
            <button  className= "mt-1 mr-1 bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full"
                type="submit" >Submit</button>
            </div>
            </form>  
        </div>
    </div>
    )

    
}
export default PopupPictureProfile;