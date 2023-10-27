import { Image, User } from "../types/Types";
import { AddPostContainer } from "./AddPostContainer";
import { CardContainer } from "./CardContainer";
import HOMEICON from "../images/home.png";
import ICONDELETE from "../images/DeleteIcon.png";
import { useState } from "react";
import { Post } from "../types/post/Types";
import useEditPost from "../hooks/post/useEditPost";
import PopupDeletePost from "../components/profile/DeletePost";
import PopupEditPost from "../components/profile/UpdatePost";
import useDeletePost from "../hooks/post/useDeletePost";
import extractYearMonthDayFromDate from "../components/utils/GetYearFromDate";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import SpinnerButton from "../components/spinner/SpinnerButton";

const MainProfile = ({user, posts, statusPost} : {user: User, posts : any, statusPost : string}) => {

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<Post>();
    const [postId , setPostId] = useState<string>("");
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
     const {updatePostMutation} = useEditPost();
     const {deletePostMutation} = useDeletePost();

    const handleUpdatePost = () => {
        setIsLoading(true);
        const userId : string = user.id;
        const tags=content.split(" ").filter(word=>word.startsWith("#"));
        const tagsString=tags.join(",");
        const post_id : string = selectedPost?.id ?? "";
        updatePostMutation.mutateAsync({postId:post_id, userId:userId , content:content,image:image,tags:tagsString},{
            onSuccess:()=> setIsLoading(false)
        });
        handlePopup();
    }
    const changeContent = (e:any) => {
        setContent(e.target.value);
    }
    const changeImage=(event:any)=>{
      setImage(event.target.files?.[0]);
    }

    const handlePopup = () => setShowPopup(!showPopup);
    const handleDeletePopup = () => setShowPopupDelete(!showPopupDelete);

    const myPosts : Post[] = posts

    
    const handleEdit = (paramPost : Post) => {
        setSelectedPost(paramPost);
        let tagContent : string = "";
        if(paramPost.tages && paramPost.tages.length > 0){
             tagContent = paramPost?.tages.map((elt) => elt.content).join(' ') ?? "";
        }
        setContent(paramPost.content + " " + tagContent);
        handlePopup()
    }
    const handleDelete = (postId : string) => {
        setPostId(postId)
        handleDeletePopup();
    }
    const submitPostToDelete = () => {
        setIsLoading(true);
        deletePostMutation.mutateAsync(postId, {
            onSuccess: ()=>setIsLoading(false)
        });
        handleDeletePopup();
    
    }
    const handleClickToHome = () => {
        navigate("/");
    }
    
    const userCreation = extractYearMonthDayFromDate(user.createdAt);
    return(
        <>
        <div className="flex flex-col">
          <div className="flex items-center border-b-2 p-10 mb-6">
                <div className="flex flex-col m-auto">
                    <div className="flex items-baseline justify-around">
                        <p>What's on your mind today barry ?</p>
                        <button
                            onClick={handleClickToHome}
                            className="ml-20 w-auto h-auto text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                               <img src={HOMEICON} alt="home" className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex justify-around">
                        <AddPostContainer user={user}/>
                    </div>
                </div>
            </div>
            <div className="mx-auto">
                {statusPost && statusPost === "loading" && (
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                 {isLoading===false?statusPost === "success" && myPosts && myPosts.length > 0 &&
                     myPosts.map((post,index)=>{
                        
                    return(                                   
                        <CardContainer 
                            key={index} 
                            post={post} 
                            isProfile={true} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} />                            
                    ) 
                    }):<SpinnerButton />
                 }
                 {statusPost === "success" && myPosts && myPosts.length === 0 && (
                    <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400">You don't have any post Yet ? Go And add one !</div>
                 )}
            </div>
        </div>
         {showPopup && (
            <PopupEditPost handlePopup={handlePopup} submitUpdatePost={handleUpdatePost} content={content} image={image!} changeContent={changeContent} changeImage={changeImage} />
        )} 
        {showPopupDelete && (
            <PopupDeletePost handlePopup={handleDeletePopup} submitDelete={submitPostToDelete}/>
        )}
      
        </>
    )
}
export default MainProfile;