import { ENDPOINTS } from "../endpoint";
import { useAxios } from "../axios/useAxios";
import { response } from "express";
import { AxiosInstance } from "axios";

const sendMessage = async (
        axios: AxiosInstance,
        formData: FormData
    )=>{
       await axios.get(ENDPOINTS.CHAT, {params: formData})
       .then(response => {return response.data})
       .catch(error => {console.log(error); return ""});
    }

export default sendMessage;