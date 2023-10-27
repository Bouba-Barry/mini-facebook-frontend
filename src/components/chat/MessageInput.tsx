import {useState, FormEvent} from 'react';
import { MessageInputProp, MessageInputProps } from '../../types/Types';

export default function MessageInput(props: MessageInputProp){
    const [message, setMessage] = useState('');
    const handleSendMessage = (e: FormEvent)=>{
        e.preventDefault();
        console.log("message : "+message);
        // TODO : ICI ON DOIT ENVOYER PROMPT A L'API
        {message!=''&&props.onSendMessage(message)};
        setMessage('');
    }
    return(
        <form
            onSubmit={(e)=>handleSendMessage(e)}
            className="flex">
            <input 
                type="text" 
                onChange={(e)=>setMessage(e.target.value)}
                value={message}
                placeholder="Write your question!"
                className="block p-1 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
            <button
                type="submit"
                className="h-9 top-0 right-0 p-2 text-sm font-medium  text-black  rounded-r-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80">
               <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90">
                  <path 
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
        </form>
    )
}