import { ICollect } from '@/types/dto';
import { defaultInstance } from '.';
import { useQuery } from '@tanstack/react-query';

const GetCollectDataApi = async (params: ICollect) => {
  const { data } = await defaultInstance.get(`/post/previews/${params.kind}?page=${params.page}`);

  return data;
};

export const useGetCollectDataQuery = (params: ICollect) => {
  const { isLoading, error, data } = useQuery([`collectData`, params], () =>
    GetCollectDataApi(params),
  );
  return { data, isLoading, error };
};
