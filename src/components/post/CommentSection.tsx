import PROFILE from '../../images/profile.png'
import { CommentSectionProps } from '../../types/Types'


export const CommentSection=(props:CommentSectionProps)=>{
    return(
        <div className="flex flex-row ml-10  mb-2">
                <div className='flex flex-row m-4'>
                    <img
                        className="h-10 w-10 rounded-full"
                        src={PROFILE}
                        alt=""
                    />
                    <div className="ml-2 ">
                        <h5 className="text-sm dark:text-white">{props.comment.user.firstName} {props.comment.user.lastName}</h5>
                        <p className="text-sm dark:text-white">{props.comment.comment}</p>
                    </div>
                </div>
            </div>
    )
}