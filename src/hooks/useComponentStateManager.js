import {useEffect, useRef, useCallback} from 'react';

function useComponentStateManager() {
    const mountedRef = useRef(true);

    useEffect(() => () => {
        mountedRef.current = false;
    }, []);

    const callIfMounted = useCallback((cb) => {
        if (cb && mountedRef.current) {
            cb();
        }
    }, []);

    return {
        callIfMounted,
    }
}

export default useComponentStateManager;