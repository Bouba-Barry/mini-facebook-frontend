import { useContext, useEffect, useState } from "react";
import { colors } from "../colors";
import { CardContainerProps } from "../types/post/Types";
import useDeleteLike from "../hooks/like/useDeleteLike";
import useDeleteUnLike from "../hooks/unLike/useDeleteUnLike";
import useInsertLike from "../hooks/like/useInsertLike";
import useInsertUnLike from "../hooks/unLike/useInsertUnLike";
import useInsertComment from "../hooks/comment/useInsertComment";
import Card from "../components/post/Card";
import authContext from "../context/AuthContextProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddCommentForm } from "../types/Types";
import { Message } from "../components/modal/Message";
import { STATE } from "../states";

export const CardContainer=(props:CardContainerProps)=>{
    const [isVisible,setIsVisible]=useState(false);
    const [likeColor,setLikeColor]=useState("");
    const { register, handleSubmit,formState:{ errors },reset } =useForm<AddCommentForm>();
    const [unlikeColor,setUnlikeColor]=useState("");
    const [showMessage, setShowMessage] = useState({show:false, message:"",action:""});
    const {deleteLikeMutation} =useDeleteLike();
    const {deleteUnLikeMutation} =useDeleteUnLike();
    const {insertLikeMutation} =useInsertLike();
    const {insertUnLikeMutation}=useInsertUnLike();
    const {insertCommentMutation}=useInsertComment();
    const userId = useContext(authContext).authState.userId ??  ""; 

    const isProfile : boolean = false;

    useEffect(()=>{
       // if props.post.likes contains the current user id, set the likeColor to colors.TEXT_BLUE_600
       props.post.likes.forEach(like=>{
              if(like.userId===userId){
                setLikeColor(colors.TEXT_BLUE_600);
              }
            })
       // if props.post.unLikes contains the current user id, set the unlikeColor to colors.TEXT_RED_600
       props.post.unLikes.forEach(unlike=>{

        console.log("unlike.userId:"+userId);
            if(unlike.userId===userId){
              setUnlikeColor(colors.TEXT_RED_600);
            }
       })       
    
    },[])

    const formatContent = (content:string) => {
        const regex = /#(\w+)/g;
        const regex2 = /(https?:\/\/[^\s]+)/g;
        const tagparts = content.match(regex); 
        if (!tagparts) {
          return <span>{content}</span>; 
        }
        const formattedContent = content.split(regex).map((part, index) => {
            part="#"+part;  
  
          if (tagparts!==null && tagparts.includes(part)) {
            return (
              <span key={index} className="text-yellow-500">
                {part}
              </span>
            );
          } else {
            part=part.substring(1);
            if(part.match(regex2)){
                return (
                    <a key={index} href={part}  className="text-blue-500 border-b-2 border-indigo-500">
                      {part}
                    </a>
                  );
              }
            else
               return <span key={index}>{part}</span>;
          }
        });
        return formattedContent;
      };
      

    const changeVisibility=()=>{
        isVisible ? setIsVisible(false) : setIsVisible(true);
    }
    const getImageFromBytes=(imageBytes:string)=>{
        return "data:image/jpeg;base64,"+imageBytes;
    }

    const changelikeColor=(postId:string)=>{
        if(likeColor===""){
            setLikeColor(colors.TEXT_BLUE_600) ;
            props.post.likes.push({id:"",userId:userId,postId:postId});
            insertLikeMutation.mutate({postId:postId,userId:userId},{
              onSuccess: () => {
              },
              onError: () => {
                setShowMessage({show:true, message:"Error inserting Like!Please try again",action:STATE.ERROR});
                setTimeout(()=>{
                  setShowMessage({show:false, message:"",action:""});
                },2000);
              },
            });
            if(unlikeColor!==""){
                setUnlikeColor("");
                deleteUnLikeMutation.mutate(getUnLikeId(userId),{
                  onSuccess: () => {
                  },
                  onError: () => {
                    setShowMessage({show:true, message:"Error deleting Unlike!Please try again",action:STATE.ERROR});
                    setTimeout(()=>{
                      setShowMessage({show:false, message:"",action:""});
                    },2000);
                  },
                });
                const newUnLikes=props.post.unLikes.filter((unLike)=>
                    unLike.id!==getUnLikeId(userId)
                )
                props.post.unLikes=newUnLikes;
            }
        }
        else{
            setLikeColor("");
            deleteLikeMutation.mutate(getLikeId(userId),{
              onSuccess: () => {
              },
              onError: () => {
                setShowMessage({show:true, message:"Error deleting Like!Please try again",action:STATE.ERROR});
                setTimeout(()=>{
                  setShowMessage({show:false, message:"",action:""});
                },2000);
              },
            });
            props.post.likes.pop();
        } 
        
    }
    const changeUnlikeColor=(postId:string)=>{
        if(unlikeColor===""){
            setUnlikeColor(colors.TEXT_RED_600) ;
            props.post.unLikes.push({id:"",userId:userId,postId:postId});
            insertUnLikeMutation.mutate({postId:postId,userId:userId},{
              onSuccess: () => {
              },
              onError: () => {
                setShowMessage({show:true, message:"Error inserting UnLike!Please try again",action:STATE.ERROR});
                setTimeout(()=>{
                  setShowMessage({show:false, message:"",action:""});
                },2000);
              },
            });
            if(likeColor!==""){
                setLikeColor("");
                deleteLikeMutation.mutate(getLikeId(userId),{
                  onSuccess: () => {
                  },
                  onError: () => {
                    setShowMessage({show:true, message:"Error deleting Like!Please try again",action:STATE.ERROR});
                    setTimeout(()=>{
                      setShowMessage({show:false, message:"",action:""});
                    },2000);
                  },
                });
                const newLikes=props.post.likes.filter((like)=>
                    like.id!==getLikeId(userId)
                )
                props.post.likes=newLikes;
            }
        }
         else{
            setUnlikeColor("");
            deleteUnLikeMutation.mutate(getUnLikeId(userId),{
              onSuccess: () => {
              },
              onError: () => {
                setShowMessage({show:true, message:"Error deleting UnLike! Please try again",action:STATE.ERROR});
                setTimeout(()=>{
                  setShowMessage({show:false, message:"",action:""});
                },2000);
              },
            });
            props.post.unLikes.pop();
         }
        setLikeColor("");
    }
    
    const onSubmit:SubmitHandler<AddCommentForm>=async(data)=>{
        const {comment}=data;
        if(comment!==""){
          insertCommentMutation.mutate({postId:props.post.id,userId:userId,comment:comment},
            {
              onSuccess: () => {
                reset({comment: ''})
              },
              onError: () => {
                setShowMessage({show:true, message:"Error adding Comment!Please try again",action:STATE.ERROR});
                setTimeout(()=>{
                  setShowMessage({show:false, message:"",action:""});
                },2000);
              },
            });
        }
        
    }

     const getLikeId=(userId:string)=>{
        const like=props.post.likes.find(like=>like.userId===userId);
        if(like){
            return like.id;
        }
        return "";
     }
     const getUnLikeId=(userId:string)=>{
        const unlike=props.post.unLikes.find(unlike=>unlike.userId===userId);
        if(unlike){
            return unlike.id;
        }
        return "";
     }

    const getElapsedTime=(date:string)=>{
        const now=Date.now();
        const createdAt=new Date(date).getTime();
        const elapsedTime=now-createdAt;
        const hours=elapsedTime/3600000;
        if(hours>24){
            return Math.floor(hours/24)+" days";
        }
        if(hours<1){
            return Math.floor(hours*60)+" minutes";
        }
        return Math.floor(hours)+" hours";
    }

    return(
      <>
      <Card
        isProfile={props.isProfile} 
        isVisible={isVisible} 
        likeColor={likeColor} 
        unlikeColor={unlikeColor} 
        formatContent={formatContent} 
        register={register} 
        handleSubmit={handleSubmit} 
        errors={errors}
        onSubmit={onSubmit}
        changeLikeColor={changelikeColor} 
        changeUnlikeColor={changeUnlikeColor} 
        getImageFromBytes={getImageFromBytes}
        changeVisibility={changeVisibility}  
        post={props.post} 
        getElapsedTime={getElapsedTime} 
        handleEdit={props.handleEdit} 
        handleDelete={props.handleDelete} />
      {
       showMessage.show && 
       <Message 
        action={showMessage.action} 
        message={showMessage.message} />
      } 
      </>
    )
}