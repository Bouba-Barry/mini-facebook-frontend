import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useMutation } from "@tanstack/react-query";

const deleteUnLikeFn = async (
    axios: AxiosInstance,
    unLikeId: string
  ) => {
    const response = await axios.delete(ENDPOINTS.UNLIKES+"/"+unLikeId);
    return response.data;
  };
  
  const useDeleteUnLike = () => {
    const { axios } = useAxios();
  
    const deleteUnLikeMutation = useMutation(
        (unLikeId:string) =>deleteUnLikeFn(axios, unLikeId)
    );
  
    return {
      deleteUnLikeMutation
    }
  };

  export default useDeleteUnLike;