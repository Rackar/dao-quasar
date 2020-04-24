import { axiosInstance } from 'boot/axios';

const request = function(type, url, data) {
  return axiosInstance[type](url, data).then(res => {
    if (res.data.code === 0) {
      return res.data.data;
    }
    return Promise.reject(res.data);
  });
};

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const remove = request.bind(null, 'remove');