import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";
import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";


const insertLikeFn = async (
    axios: AxiosInstance,
    formData: {postId:string,userId:string}
  ) => {
    const response = await axios.post(ENDPOINTS.LIKES, formData);
    return response.data;
  };
  
  const useInsertLike = () => {
    const { axios } = useAxios();
  
    const insertLikeMutation = useMutation(
      (formData:{postId:string,userId:string}) =>
        insertLikeFn(axios, formData)
    );
  
    return {
      insertLikeMutation
    }
  };

export default useInsertLike;