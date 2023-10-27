import { useContext, useState } from "react";
import AddPost from "../components/addPost/AddPost";
import PopupAddPost from "../components/addPost/PopupAddPost";
import useInsertPost from "../hooks/post/useInsertPost";
import authContext from "../context/AuthContextProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddPostContainerProps, AddPostForm } from "../types/Types";
import { Message } from "../components/modal/Message";
import { STATE } from "../states";
import Spinner from "../components/spinner/Spinner";

export const AddPostContainer = (props: AddPostContainerProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const {insertPostMutation}=useInsertPost();

    const userId = useContext(authContext).authState.userId ??  "";
    const [showMessage, setShowMessage] = useState({show:false, message:"",action:""});
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit,formState:{ errors } } =useForm<AddPostForm>();
    const addPostClick = () => {
        setShowPopup(true);
    }
    const closePopupClick = () => {
        setShowPopup(false);
    }

    const onSubmit:SubmitHandler<AddPostForm>=async(data)=>{
      setIsLoading(true);
      const image=data.image[0];
      const content=data.content;
      const tags=content.split(" ").filter(word=>word.startsWith("#"));
      const tagsString=tags.join(",");
      setShowPopup(false);
      insertPostMutation.mutate({userId:userId,content:content,image:image,tags:tagsString},{
        onSuccess: () => setIsLoading(false),
        onError: () => {
          setShowMessage({show:true, message:"Error adding post!Please try again",action:STATE.ERROR});
          setTimeout(()=>{
            setShowMessage({show:false, message:"",action:""});
          },2000);
        },
      });
    }

  return(
    <>
    <AddPost addPostClick={addPostClick} user={props.user}/>
    {
    showPopup && <PopupAddPost onSubmit={onSubmit} errors={errors} handleSubmit={handleSubmit} register={register} 
     closePopupClick={closePopupClick}  /> 
    }
    {
       showMessage.show && <Message action={showMessage.action} message={showMessage.message} />
    }
    </>
  )
}