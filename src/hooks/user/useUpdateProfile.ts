import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";
import { AxiosInstance } from "axios";
import { ENDPOINTS } from "../endpoint";


const updateProfileFn = async (
    axios: AxiosInstance,
    formData: { userId:string ,image:any}
  ) => {
    const form = new FormData();
    form.append("file", formData.image);
    const response = await axios.put(`${ENDPOINTS.IMAGES}/user/${formData.userId}`, form,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
    return response.data;
  };


const useUpdateProfile = () => {
    const { axios } = useAxios();
    const queryClient = useQueryClient();

    const updateProfile=useMutation({
            mutationFn:(formData:{userId: string,image:any}) =>
            updateProfileFn(axios, formData),
            onSuccess:async()=>{
                queryClient.invalidateQueries(["fetchOneUser"]);
            }
      });
      
        return {
          updateProfile
        }
}
export default useUpdateProfile;