import { AxiosInstance } from "axios";
import { useAxios } from "../axios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../endpoint";

const fetchUserPostsQueryFn = async (axios: AxiosInstance, userId: string) => {
                try{
                   const res = await axios.get( `${ENDPOINTS.POSTS}/user/${userId}`);
                   return res.data;
             } catch(error : any) { throw error;}
}

const useGetUserPosts = (userId:string) => {
    const { axios } = useAxios();
    const { status, data} = useQuery({
      queryKey: ["fetchUserPosts"],
      queryFn:() => fetchUserPostsQueryFn(axios, userId),
      refetchInterval:5000
    });
    return {
        statusPost: status,
        posts : data ? data : [],
      };

}
export default useGetUserPosts;