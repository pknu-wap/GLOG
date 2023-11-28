import { useQuery } from "@tanstack/react-query";
import { defaultInstance } from ".";

export const GetUserDetailApi = async () => {
    const {data} = await defaultInstance.get('/user/detail');
  
    return data;
  };
  
  export const useGetUserDetailQuery = () => {
    const {isLoading, error, data } = useQuery(['userDetail'], () => GetUserDetailApi());
  
    return {isLoading, error, data };
  };