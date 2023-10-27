import PROFILE from '../../images/profile.png'
import {AiOutlineLike} from "react-icons/ai";
import {BiDislike} from "react-icons/bi";
import {FaRegComment} from "react-icons/fa";
import {colors} from "../../colors";
import { CardProps } from '../../types/post/Types';
import { CommentSection } from './CommentSection';
import AddComment from './AddComment';
import EDIT from "../../images/editMe.png";
import ICONDELETE from "../../images/DeleteIcon.png";

export default function Card(props:CardProps){
    return(
        <div 
            className={`mx-auto ${props.isProfile?'w-8/12 h-7/12 mb-6':'w-6/12 h-5/12 mb-6'} bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}>
            <div 
                className='flex flex-row m-4'>
                <img
                    className="h-10 w-10 rounded-full"
                    src={ props.post.user.profile!==null ? props.getImageFromBytes(props.post.user.profile.imageBytes):PROFILE}
                    alt=""
                    /> 
                <h5 
                    className='mt-2 ml-2 mr-auto dark:text-white'>
                        {props.post.user.firstName} {props.post.user.lastName}
                </h5>
                {props.isProfile && (
                <div className=''>
                    <button 
                        onClick={() => props.handleEdit(props.post)}
                        className='ml-10 mr-2'>
                        <img 
                            src={EDIT} 
                            alt="edit" 
                            className='w-7 h-7 p-1 rounded bg-gray-300' />
                    </button>
                    <button 
                        onClick={() => props.handleDelete(props.post.id)}>
                        <img 
                            src={ICONDELETE} 
                            alt="delete" 
                            className='w-7 h-7 p-1 rounded bg-red-400' />
                    </button>
                </div> 
            )}
            </div>

            <div 
                className='flex flex-col items-left mt-1 ml-10 mr-10'>
                <p 
                    className='mb-3 dark:text-white'>
                        {props.formatContent(props.post.content)}
                </p>
                {props.post.images[0]!==undefined &&
                <img  
                    src={props.getImageFromBytes(props.post.images[0].imageBytes)} 
                    className='w-83 h-83'/>
                }
            </div>
            <div 
                className='flex flex-row  justify-between  ml-10 mt-3 mb-2 w-full'>
                <div 
                    className="flex flex-row">
                    <div className='flex flex-row'>
                        {
                            props.likeColor==="" ? <button onClick={()=>{props.changeLikeColor(props.post.id)}}  className={`dark:text-white font-light ${props.likeColor}`}>
                                <AiOutlineLike className='w-7 h-7' />
                            </button>:<button onClick={()=>{props.changeLikeColor(props.post.id)}}  className={`dark:${colors.TEXT_BLUE_600} font-light ${props.likeColor}`}>
                                <AiOutlineLike className='w-7 h-7' />
                            </button>
                        }
                    <p className='mt-3.5 dark:text-white'>{props.post.likes.length}</p>
                    </div>
                <div className='flex flex-row mt-3'>
                    {
                        props.unlikeColor==="" ?  <button onClick={()=>{props.changeUnlikeColor(props.post.id)}} className={`dark:text-white font-light ${props.unlikeColor}`}>
                            <BiDislike className='w-7 h-7' />
                        </button> : <button onClick={()=>{props.changeUnlikeColor(props.post.id)}} className={`dark:${colors.TEXT_RED_600} font-light ${props.unlikeColor}`}>
                            <BiDislike className='w-7 h-7' />
                        </button>
                    }
                   <p className='mt-1 mr-1 dark:text-white'>{props.post.unLikes.length}</p>
                </div>
                <div className='flex flex-row mt-2'>
                   <button className="text-black dark:text-white mt-1" onClick={props.changeVisibility}>
                    <FaRegComment className='w-7 h-7 mr-1' />
                   </button>
                   <p className='mt-2 dark:text-white'>{props.post.comments.length}</p>
                </div>
                </div>
                <div className='mr-12 mt-6 dark:text-white' >
                    <p>It's been {props.getElapsedTime(props.post.createdDate)}</p>
                </div>
            </div>
            {props.isVisible && 
               props.post.comments.map((comment,index)=>{
                  return <CommentSection  key={index} comment={comment}/>
               })
            }
             {props.isVisible && 
                <AddComment register={props.register} onSubmit={props.onSubmit} 
                handleSubmit={props.handleSubmit} errors={props.errors}  />
            }
        </div>
    );
}