import React from 'react';
import './global.scss';
import Routes from './pages';
import { Provider } from 'react-redux';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  toastBody: {
    ...theme.typography.subtitle1,
    color: theme.palette.primary.main,
  },
}));

function Root() {
  const styles = useStyles();
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Routes />
        <ToastContainer
          hideProgressBar
          pauseOnHover={false}
          bodyClassName={styles.toastBody}
        />
      </CookiesProvider>
    </Provider>
  );
}

export default Root;
