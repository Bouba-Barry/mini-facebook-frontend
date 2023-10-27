import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const insertPostFn = async (
    axios: AxiosInstance,
    formData: {userId:string, content:string, image:any,tags:string}
  ) => {
    const form = new FormData();
    formData.tags==="" ? form.append("tags","no_tags") : form.append("tags",formData.tags);
    formData.image==="" ? form.append("file","no_image") : form.append("file",formData.image);
    form.append("file",formData.image);
    form.append("content", formData.content);
    form.append("userId", formData.userId);
    const response = await axios.post(ENDPOINTS.POSTS, form,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
    return response.data;
  };
  
  const useInsertPost = () => {
    const { axios } = useAxios();
    const queryClient = useQueryClient()
  
    const insertPostMutation = useMutation({
    mutationFn:   (formData:{userId:string, content:string,image:any,tags:string}) =>
        insertPostFn(axios, formData),
        onSuccess:async()=>{
            queryClient.invalidateQueries(["fetchAllPosts"]);
        }
  });
  
    return {
      insertPostMutation
    }
  };

export default useInsertPost;