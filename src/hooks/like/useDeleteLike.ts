import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useMutation } from "@tanstack/react-query";



const deleteLikeFn = async (
    axios: AxiosInstance,
    likeId: string
  ) => {
    const response = await axios.delete(ENDPOINTS.LIKES+"/"+likeId);
    return response.data;
  };
  
  const useDeleteLike = () => {
    const { axios } = useAxios();
  
    const deleteLikeMutation = useMutation(
        (likeId:string) =>deleteLikeFn(axios, likeId)
    );
  
    return {
      deleteLikeMutation
    }
  };
  export default useDeleteLike;