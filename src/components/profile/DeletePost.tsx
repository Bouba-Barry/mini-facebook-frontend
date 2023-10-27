import { PopupDeleteProps} from "../../types/post/Types";
import FormHeader from "../addPost/FormHeader";

const PopupDeletePost = (props: PopupDeleteProps ) => {

    return(
     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="p-6 pt-4 mb-4 pb-2 w-1/2 bg-white dark:bg-black rounded shadow-md">
            <FormHeader  closePopupClick={props.handlePopup} title="Delete Post"/>
                <div className="flex flex-col">
                    <div className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-red dark:bg-gray-800 dark:text-blue-400" role="alert">
                       <div>
                            <span className="font-medium">Danger alert!</span> Are You Sure You want to delete this Post ?.
                        </div>
                    </div>
                    <div className="flex items-end p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                            <button type="button" onClick={props.handlePopup} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
                            <button type="button" onClick={props.submitDelete} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Confirm</button>
                    </div>
                </div>
              
            </div>
        </div>
    )

    
}
export default PopupDeletePost;