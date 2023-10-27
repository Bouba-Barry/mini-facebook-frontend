import { PopupEditPostprops } from "../../types/post/Types";
import FormHeader from "../addPost/FormHeader";

const PopupEditPost = (props: PopupEditPostprops ) => {

    return(
   <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 
    flex justify-center items-center">
        <div className="p-6 pt-4 mb-4 pb-2 w-1/2 bg-white dark:bg-black rounded shadow-md">
            <FormHeader  closePopupClick={props.handlePopup} title="Edit Your Post"/>
                <form onSubmit={props.submitUpdatePost} className="flex flex-col">    
                <div className="mb-3">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">comment</label>
                    <textarea id="content" value={props.content} onChange={props.changeContent} rows={9} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Am Mr X, from ..."></textarea>
                </div>  
                  <div className="mb-3">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                    <input  onChange={props.changeImage} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                </div>

                <div className="grid justify-items-end">
                    <button className= "mt-1 mr-1 bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full" type="submit">
                        edit 
                    </button>
                </div>
            </form> 
        </div>
        </div>  
    )

    
}
export default PopupEditPost;