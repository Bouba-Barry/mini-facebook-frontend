import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useQuery } from "@tanstack/react-query";


const fetchProfileQueryFn = async (axios: AxiosInstance, userId : string) => {
    try{
         const response = await axios.get(`${ENDPOINTS.IMAGES}/user/${userId}`);
         return response.data;
    }catch(error : any) {console.log(error)}
}
    
   
const useGetProfile = (userId : string) => {
    const {axios} = useAxios();
    const {status, data} = useQuery({
        queryKey: ["fetchUserProfile"],
        queryFn : () => fetchProfileQueryFn(axios, userId),
        refetchOnWindowFocus : false
    })
    return{
        statusProfile : status,
        userProfile : data ? data : [],
    }
}

export default useGetProfile;