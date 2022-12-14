import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../../constants/defaults';
import { onSuccess, onError } from './requestHandler';

const instance = axios.create({ baseURL: BASE_URL });
instance.defaults.headers.post['Content-Type'] = 'application/json';

const request = async ({ ...options }: AxiosRequestConfig) => {
  return instance(options).then(onSuccess).catch(onError);
};

export default request;
