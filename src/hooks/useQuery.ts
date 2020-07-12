import { useState, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useComponentStateManager from './useComponentStateManager';

interface State<T> {
    loading: boolean;
    // TODO fix type
    error: any;
    data: T | null;
}

function useQuery<T>(url: string, config?: AxiosRequestConfig): [State<T>, (config?: AxiosRequestConfig) => void] {
  const [state, setState] = useState<State<T>>({
    loading: false,
    data: null,
    error: null,
  });
  const { callIfMounted } = useComponentStateManager();
  const fetch = useCallback((fetchConfig?: AxiosRequestConfig) => new Promise(((resolve, reject) => {
    setState(() => ({
      loading: true,
      data: null,
      error: null,
    }));
    axios(url, { ...config, ...fetchConfig }).then((res: AxiosResponse<T>) => {
      callIfMounted(() => {
        setState(prevState => ({
          ...prevState,
          data: res.data,
          error: null,
          loading: false,
        }));
      });
      resolve(res.data);
    }).catch((err: AxiosError) => {
      callIfMounted(() => {
        setState(prevState => ({
          ...prevState,
          data: null,
          error: err.response?.data?.message || '',
          loading: false,
        }));
      });
      reject(err);
    });
  })), [callIfMounted, url, config]);
  return [state, fetch];
}

export default useQuery;
