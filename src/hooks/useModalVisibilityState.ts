import { useCallback, useState } from 'react';

function useModalVisibilityState(isVisibleByDefault = false): [
  boolean,
  () => void,
  () => void,
  () => void,
] {
  const [isVisible, setIsVisible] = useState(isVisibleByDefault);
  const open = useCallback(() => setIsVisible(true), []);
  const close = useCallback(() => setIsVisible(false), []);
  const switchVisibility = useCallback(() => setIsVisible(prev => !prev), []);

  return [
    isVisible,
    open,
    close,
    switchVisibility,
  ];
}

export default useModalVisibilityState;
