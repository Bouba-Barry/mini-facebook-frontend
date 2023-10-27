import FormHeader from "./FormHeader";
import { PopupProps } from "../../types/Types";
import {Error} from "../error/Error"

export default function PopupAddPost(props:PopupProps) {
 return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 
    flex justify-center items-center">
        <div className="p-6 pt-4 mb-4 pb-2 bg-white dark:bg-black rounded shadow-md">
            <FormHeader  closePopupClick={props.closePopupClick} title="Add new post"/>
            <form onSubmit={props.handleSubmit(props.onSubmit)} className="flex flex-col">            
            <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" {...props.register("content",{required:true,minLength:3})} rows={9} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            <Error error={props.errors.content} />
            </div>
            <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload image</label>
            <input {...props.register("image",{required:false})} className="block w-full bg-black text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
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