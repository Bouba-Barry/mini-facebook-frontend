import PROFILE from '../../images/profile.png'
import { AiOutlinePlus } from 'react-icons/ai';
import { AddPostProps } from '../../types/Types';
import React from 'react';
import Typed from 'typed.js';

export default function AddPost(props:AddPostProps) {
  const el = React.useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Add new post'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });
    return () => {
      typed.destroy();
    };
  }, []);
  const getImageFromBytes=(imageBytes:string)=>{
    return "data:image/jpeg;base64,"+imageBytes;
}
return(
    <div className='flex flex-row items-center justify-center m-4 '>
       <div><button>
       <img
        className="h-9 w-9 rounded-full mr-2"
        src={props.user!=undefined && props.user.profile !== null ? getImageFromBytes(props.user.profile.imageBytes):PROFILE}
        alt=""
        /></button>
       </div>
       <div>
       <div className="flex">                
            <div className="relative w-80 h-4 mb-5">
                <input  disabled className="block p-2 w-full
                z-20 text-sm text-gray-900 bg-gray-50 rounded-lg 
                  border-none outline-none
                dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                ref={el} required />
                <button onClick={props.addPostClick} type="submit" 
                className="absolute h-9 top-0 right-0 p-2 text-sm 
                font-medium  text-black  rounded-r-lg 
                  dark:bg-blue-600 dark:hover:bg-blue-700 
                dark:focus:ring-blue-800">
                    <AiOutlinePlus className="w-4 h-4"/>
                </button>
            </div>
        </div>
       </div>
 
    </div>
)
}