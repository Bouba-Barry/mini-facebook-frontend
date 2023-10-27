import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const insertCommentFn = async (
    axios: AxiosInstance,
    formData: {postId:string,userId:string,comment:string}
  ) => {
    const response = await axios.post(ENDPOINTS.COMMENTS, formData);
    return response.data;
  };
  
  const useInsertComment = () => {
    const { axios } = useAxios();
    const queryClient = useQueryClient()

  
    const insertCommentMutation = useMutation({
      mutationFn:(formData:{postId:string,userId:string,comment:string}) =>
        insertCommentFn(axios, formData),
        onSuccess:async ()=>{
            queryClient.invalidateQueries(["fetchAllPosts"]);
        }
  });
  
    return {
        insertCommentMutation
    }
  };

export default useInsertComment;