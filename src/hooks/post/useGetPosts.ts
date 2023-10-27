import { AxiosInstance } from "axios";
import { useAxios } from "../axios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../endpoint";
import { Post } from "../../types/post/Types";
import { useEffect } from "react";

const fetchPostsQueryFn = async (
    axios: AxiosInstance,
    content: string
  ): Promise<Post[]> =>
  axios.get( `${ENDPOINTS.POSTS}`,{
    params:{
      content:content
    }
  }).then((response) => response.data);

const useGetPosts = (content:string) => {
    const { axios } = useAxios();
    const { status, data, error ,refetch} = useQuery({
      queryKey: ["fetchAllPosts"],
      queryFn:() => fetchPostsQueryFn(axios, content),
      refetchOnWindowFocus: false
    });
 
  useEffect(() => {
    refetch();
  },[content])

    return {
        status,
        posts: data ? data : [],
        error,
      };

}
export default useGetPosts;