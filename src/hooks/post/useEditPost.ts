import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const updatePostFn = async (
    axios: AxiosInstance,
    formData: {postId:string, userId:string, content:string, image:any,tags:string}
  ) => {
    const form = new FormData();
    
    const postCommand={
        content:formData.content,
        userId:formData.userId,
    }
    console.log("here:"+JSON.stringify(postCommand));
    form.append("file", formData.image);
    form.append("post",JSON.stringify(postCommand));
    const response = await axios.put(`${ENDPOINTS.POSTS}/${formData.postId}`, form,{
        headers: {
            "Content-Type": "multipart/form-data",
          },

    });
    return response.data;
  };
  
  const useEditPost = () => {
    const { axios } = useAxios();
    const queryClient = useQueryClient()
  
    const updatePostMutation = useMutation({
    mutationFn:   (formData:{postId: string, userId:string, content:string,image:any,tags:string}) =>
        updatePostFn(axios, formData),
        onSuccess:async()=>{
            queryClient.invalidateQueries(["fetchUserPosts"]);
        }
  });
  
    return {
      updatePostMutation
    }
  };

export default useEditPost;