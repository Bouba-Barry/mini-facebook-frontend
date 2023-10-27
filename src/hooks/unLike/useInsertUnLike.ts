import { AxiosInstance } from "axios";
import { UnLike } from "../../types/Types";
import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { useMutation } from "@tanstack/react-query";



const insertUnLikeFn = async (
    axios: AxiosInstance,
    formData:{postId:string,userId:string}
  ) => {
    const response = await axios.post(ENDPOINTS.UNLIKES, formData);
    return response.data;
  };
  
  const useInsertUnLike = () => {
    const { axios } = useAxios();
  
    const insertUnLikeMutation = useMutation(
      (formData:{postId:string,userId:string}) =>
        insertUnLikeFn(axios, formData)
    );
  
    return {
      insertUnLikeMutation
    }
  };

export default useInsertUnLike;