import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/Types";


const fetchUserQueryFn = async (axios: AxiosInstance, userId : string):
Promise<User> => 
    axios.get(`${ENDPOINTS.USERS}/${userId}`)
    .then((response) => response.data);      

    
   
const useGetUser = (userId : string) => {
    const {axios} = useAxios();
    console.log(`${ENDPOINTS.USERS}/${userId}`);
    const {status, data, error} = useQuery({
        queryKey: ["fetchOneUser"],
        queryFn : () => fetchUserQueryFn(axios, userId),
        refetchOnWindowFocus : false
    })


    return{
        status,
        userData : data ? data : undefined,
        error
    }
}

export default useGetUser;