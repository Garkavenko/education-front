import { useRef, useEffect, useCallback } from 'react';

function useComponentStateManager() {
  const isMountedRef = useRef(true);
  const callIfMounted = useCallback((cb: () => void) => {
    if (!isMountedRef.current || !cb) return null;
    return cb();
  }, []);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, []);

  return {
    isMounted: isMountedRef.current,
    callIfMounted,
  };
}

export default useComponentStateManager;
