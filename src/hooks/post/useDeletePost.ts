import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePostFn = async (axios: AxiosInstance, postId: string) => {
   await axios.delete(`${ENDPOINTS.POSTS}/${postId}`);
  };
  
  const useDeletePost = () => {
    const { axios } = useAxios();
    const queryClient = useQueryClient();
    const deletePostMutation = useMutation(
        (postId:string) =>deletePostFn(axios, postId),{
          onSuccess: async () => {
             queryClient.invalidateQueries(["fetchUserPosts"]);
          }
        }
    );
  
    return {
      deletePostMutation
    }
  };

  export default useDeletePost;