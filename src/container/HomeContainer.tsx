import { useEffect, useState, useContext } from "react";
import NavBar from "../components/navBar/Navbar";
import { AddPostContainer } from "./AddPostContainer";
import useGetPosts from "../hooks/post/useGetPosts";
import { CardContainer } from "./CardContainer";
import { STATE } from "../states";
import Spinner from "../components/spinner/Spinner";
import { Message } from "../components/modal/Message";
import { Post } from "../types/post/Types";
import ChatAppContainer from "./ChatContainer";
import authContext from "../context/AuthContextProvider";
import useGetUser from "../hooks/user/useGetUser";


export const HomeContainer = () => {
  const user : any = useContext(authContext)?? "";
  const [search, setSearch] = useState<string>("");
  const changeSearch = (search: string) => {
         console.log(search);
        setSearch(search);
   }
   const {userData} = useGetUser(user.authState.userId);
  const { status, posts, error } = useGetPosts(search);
  console.log(status);  
  const handleEdit = (post : Post) => {
   
  }
  const handleDelete = (postId: string) => {

  }
  return(
    <>
    <NavBar search={search} changeSearch={changeSearch} user={userData!}/>
    <div className='flex flex-col items-center pl-20 pr-20 dark:bg-black'>
    <AddPostContainer user={userData!}/>
    {
      status===STATE.LOADING ? <Spinner/> :
            posts.map((post,index)=>{
             return <CardContainer key={index}  post={post} isProfile={false} handleEdit={handleEdit} handleDelete={handleDelete} />
            })
    }
    {
      status===STATE.ERROR && <Message action={STATE.ERROR} message="Server Not Responding please try earlier" />
    }
    </div>
    <ChatAppContainer />
    </>
  )
}