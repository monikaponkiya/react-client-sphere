import { crAPI } from 'services/api/cr';
import { ICrReq } from 'services/api/cr/types';

import { useFetch, useRequest } from '..';
import { crKeys } from '../queryKeys';

export const useCrList = (data: ICrReq) => {
  return useFetch({
    queryFn: () => crAPI.crList(data),
    queryKey: crKeys.crList(data),
    queryOptions: {
      staleTime: Infinity,
      retry: false
    }
  });
};

export const useCrDetail = (id: number) => {
  return useFetch({
    queryFn: () => crAPI.crDetail(id),
    queryKey: crKeys.crDetail(id),
    queryOptions: {
      staleTime: Infinity,
      retry: false,
      enabled: Boolean(id)
    }
  });
};

export const useAddCr = () => {
  return useRequest({
    mutationFn: crAPI.addCr,
    mutationKey: crKeys.crAdd
  });
};

export const useEditCr = () => {
  return useRequest({
    mutationFn: crAPI.editCr,
    mutationKey: crKeys.crEdit
  });
};

export const useCrStatus = () => {
  return useRequest({
    mutationFn: crAPI.crStatus,
    mutationKey: crKeys.crStatus
  });
};

export const useDeleteCr = () => {
  return useRequest({
    mutationFn: crAPI.deleteCr,
    mutationKey: crKeys.crDelete
  });
};

export const useCrDetailByProductId = (id: number) => {
  return useFetch({
    queryFn: () => crAPI.crDetailByProjectId(id),
    queryKey: crKeys.crDetailByProductId(id),
    queryOptions: {
      staleTime: Infinity,
      retry: false,
      enabled: Boolean(id)
    }
  });
};
