import React, { useEffect, useState } from 'react';
import useQuery from '../hooks/useQuery';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { saveUser } from '../store/user';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

function isAuthPath() {
  return window.location.pathname === '/auth';
}

function AuthHandler({ children }: { children: React.ReactNode }) {
  const [state, fetch] = useQuery('/user-info');
  const [cookies] = useCookies(['AUTH_TOKEN']);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch();
        dispatch(saveUser(res));
        // eslint-disable-next-line no-empty
      } catch (e) {}
      setDone(true);
    })();
  }, [dispatch, fetch]);
  if (done && state.loaded && !state.error && isAuthPath()) {
    return <Redirect to="/" />;
  }

  if ((done && state.error?.code === 401 || !cookies['AUTH_TOKEN']) && !isAuthPath()) {
    return <Redirect to="/auth" />;
  }

  if (state.loading || !state.loaded || !done) {
    return (
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <CircularProgress />
      </div>
    );
  }

  return <>{children}</>;
}

function withAuth(Component: any) {
  return function() {
    return (
      <AuthHandler>
        <Component />
      </AuthHandler>
    );
  };
}

export default withAuth;
