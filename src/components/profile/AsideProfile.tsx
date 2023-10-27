import PROFILE from '../../images/profile.png';
import UpdateIcon from '../../images/updateIcon.png'
import { useEffect, useState } from 'react';
import { Post } from '../../types/post/Types';
import PopupEditProfile from './PopupEditProfile';
import { AsideProfileProps } from '../../types/profile/Types';
import { FaCamera } from 'react-icons/fa';


const AsideProfile = (props: AsideProfileProps) => {

    const [totalPost, setTotalPost] = useState<number>(0);
    const [likedPercent, setLikedPercent] = useState("0");
    const [unlikedPercent, setUnlikedPercent] = useState("0");
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handlePopup = () => setShowPopup(!showPopup);
    console.log("props : ", props);

    useEffect(() => {
        const userPosts : Post[] = props.posts??[];
        console.log("userPost : ", userPosts);
        const numTotalPosts : number = userPosts ? userPosts.length : 0 ;
        
        const numLikedPosts = userPosts.filter((post) => post.likes.length > 0).length ?? 0;
        const numUnlikedPosts = userPosts.filter((post) => post.unLikes.length > 0).length ?? 0;
        const likedPerc: string = (numTotalPosts > 0 ? (numLikedPosts / numTotalPosts) * 100 : 0).toFixed(0).toString();
        const unLikePerc = (numUnlikedPosts>0 && numTotalPosts>0 ?(numUnlikedPosts / numTotalPosts) *100:0).toFixed(0).toString();
        
        setTotalPost(numTotalPosts);
        setLikedPercent(likedPerc);
        setUnlikedPercent(unLikePerc);
    }, [props.posts])
    
    console.log("location : "+props.user.location);
    const getImageFromBytes=(imageBytes:string)=>{
        return "data:image/jpeg;base64,"+imageBytes;
    }
 
    return(
        <>
            <div className="w-full flex flex-col ">
                <div className='fixed w-1/3 h-screen bg-gray-300 p-12'>  
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <div className='relative'>
                                <img src={props.user.profile!==null?getImageFromBytes(props.user.profile.imageBytes):PROFILE}  alt="user" className='w-36 h-36 m-auto  rounded-full' />
                                <button
                                    className="absolute top-0 right-16 opacity-2 "
                                    onClick={props.handleProfileChange}
                                >
                                    <FaCamera />
                                </button>
                            </div>                            
                             <p className='text-lg font-bold pt-8 pl-0 mt-16'>{props.user.firstName + " " + props.user.lastName}</p>

                        </div>
                    </div>

                    <div className='flex justify-start w-full border-b-2 p-6 border-black'>
                        <div className='text-center mr-auto ml-6'>
                            <div className="font-bold">{totalPost}</div>
                            <div>POSTs</div>
                        </div>
                        <div className='text-center mr-auto'>
                            <div className="font-bold">{ likedPercent ? likedPercent : 0 }%</div>
                            <div>Liked</div>
                        </div>
                         <div className='text-center mr-auto'>
                            <div className="font-bold">{unlikedPercent ? unlikedPercent:0}%</div>
                            <div>Unliked</div>
                        </div>           
                    </div>          
                    <div>
                        <div className='flex justify-center'>
                            <h4 className='text-xl font-bold text-center p-6'>Your Information</h4>
                            
                            <button onClick={handlePopup}>
                                <img src={UpdateIcon} alt="update" className="w-6 h-6"/>
                            </button>
                        </div>
                    
                        <div className="grid grid-cols-1 gap-6 mt-4 ">
                            <div className="grid grid-cols-2 mb-6">
                                <div className='mr-2'>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={props.user.firstName}
                                        readOnly
                                        className="block  w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />     
                                </div>
                                <div> 
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={props.user.lastName}
                                        readOnly
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    /> 
                                </div>      
                            </div>
                            <div className="grid grid-cols-1 mb-6">      
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={props.user.email}
                                    readOnly
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />              
                            </div>
                            <div className="grid grid-cols-1 mb-6">      
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    readOnly
                                    placeholder='Marrakech, Sidi Abbad'
                                    value={props.user.location}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />              
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <PopupEditProfile handlePopup={handlePopup} updateUser={props.updateUserClick} user={props.user}/>
            )}
        </>
    )

}
export default AsideProfile;