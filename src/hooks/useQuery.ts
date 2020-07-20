import { useState, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useComponentStateManager from './useComponentStateManager';
import { useCookies } from 'react-cookie';
import { getUrl } from '../utils';

interface State<T> {
    loading: boolean;
    loaded: boolean;
    error: { code: number; message?: string } | null;
    data: T | null;
}

function useQuery<T>(urlParam: string, config?: AxiosRequestConfig): [State<T>, (config?: AxiosRequestConfig) => Promise<any>] {
  const url = getUrl(urlParam);
  const [cookies] = useCookies(['AUTH_TOKEN']);
  const [state, setState] = useState<State<T>>({
    loading: false,
    loaded: false,
    data: null,
    error: null,
  });
  const { callIfMounted } = useComponentStateManager();
  const fetch = useCallback((fetchConfig?: AxiosRequestConfig) => new Promise(((resolve, reject) => {
    setState(() => ({
      loading: true,
      data: null,
      error: null,
      loaded: false,
    }));
    axios(url, {
      ...config,
      ...fetchConfig,
      headers: {
        ...config?.headers,
        ...fetchConfig?.headers,
        AUTH_TOKEN: cookies.AUTH_TOKEN,
      },
    }).then((res: AxiosResponse<T>) => {
      callIfMounted(() => {
        setState(prevState => ({
          ...prevState,
          data: res.data,
          error: null,
          loading: false,
          loaded: true,
        }));
      });
      resolve(res.data);
    }).catch((err: AxiosError) => {
      callIfMounted(() => {
        setState(prevState => ({
          ...prevState,
          data: null,
          error: err.response?.data || null,
          loading: false,
          loaded: true,
        }));
      });
      reject(err);
    });
  })), [url, config, cookies.AUTH_TOKEN, callIfMounted]);
  return [state, fetch];
}

export default useQuery;
