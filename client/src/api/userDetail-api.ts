import { useQuery } from '@tanstack/react-query';
import { defaultInstance } from '.';
import { IUserDetail } from '@/types/dto';

export const GetUserDetailApi = async () => {
  const { data } = await defaultInstance.get('/user/detail');

  return data;
};

export const useGetUserDetailQuery = () => {
  const {
    isLoading,
    error,
    data: backendData,
  } = useQuery(['userDetail'], () => GetUserDetailApi());

  const data: IUserDetail = backendData;

  return { isLoading, error, data };
};
