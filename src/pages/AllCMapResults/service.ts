import request, { extend } from 'umi-request';
import { message } from 'antd';
// @ts-ignore
import { API_PREFIX } from '@/common/constants';
const errorHandler = function (error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.status);
    console.log(error.data);
    if (error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    console.log(error.message);
    message.error('Network error');
  }

  throw error; // If throw. The error will continue to be thrown.
  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};
export const extendRequest = extend({ errorHandler });

export const getRemoteAllCMapResult = async ({
                                            pageSize,
                                            pageIndex,
                                            dataset,
                                               trait,
                                            datasetid,
                                            tissue,
                                            cmap_name,
                                            sig_index,
                                            sort_field,
                                            sort_direction
                                          }: {
  pageSize: number | undefined;
  pageIndex: number | undefined;
  dataset: string | undefined;
  datasetid: number | undefined;
  trait: string | undefined;
  tissue: string | undefined;
  cmap_name:string | undefined;
  sig_index: string | undefined;
  sort_field: string | undefined;
  sort_direction: string | undefined;
}) => {
  return extendRequest(API_PREFIX + '/allcmapresult', {
    method: 'get',
    params: {
      pageSize: pageSize,
      pageIndex: pageIndex,
      dataset: dataset,
      datasetid:datasetid,
      trait:trait,
      tissue: tissue,
      cmap_name:cmap_name,
      sig_index: sig_index,
      sort_field:sort_field,
      sort_direction:sort_direction
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
export const getRemoteAllCMapResultLike = async ({
                                                pageSize,
                                                pageIndex,
                                                dataset,
                                                datasetid,
                                                   trait,
                                                tissue,
                                                cmap_name,
                                                sig_index,
                                              }: {
  pageSize: number | undefined;
  pageIndex: number | undefined;
  dataset: string | undefined;
  datasetid: number | undefined;
  trait: string | undefined;
  tissue: string | undefined;
  cmap_name:string | undefined;
  sig_index: string | undefined;
}) => {
  return extendRequest(API_PREFIX + '/allcmapresultlike', {
    method: 'get',
    params: {
      pageSize: pageSize,
      pageIndex: pageIndex,
      dataset: dataset,
      datasetid:datasetid,
      trait:trait,
      tissue: tissue,
      cmap_name:cmap_name,
      sig_index: sig_index,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};