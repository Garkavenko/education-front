import { useState, useCallback } from 'react';
import axios from 'axios';
import useComponentStateManager from "./useComponentStateManager";

function useQuery(url, config) {
    const [state, setState] = useState({
        loading: false,
        data: null,
        error: null
    });
    const { callIfMounted } = useComponentStateManager();
    const fetch = useCallback((data) => {
        setState(prevState => ({
            loading: true,
            data: null,
            error: null
        }));
        axios(url, {...config, data: data}).then(res => {
            callIfMounted(() => {
                setState(prevState => ({
                    ...prevState,
                    data: res.data,
                    error: null,
                    loading: false,
                }))
            })
        }).catch(err => {
            callIfMounted(() => {
                setState(prevState => ({
                    ...prevState,
                    data: null,
                    error: err,
                    loading: false,
                }))
            })
        })
    }, [callIfMounted, url, config]);
    return [state, fetch];
}

export default useQuery;
