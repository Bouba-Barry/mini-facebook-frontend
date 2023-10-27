import axios from 'axios';
import { useContext } from 'react';
import authContext from '../../context/AuthContextProvider';


export const useAxios = () => {
   const token = useContext(authContext).authState.authToken;
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_VITE_API_BASE_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return { axios: axiosInstance };
};