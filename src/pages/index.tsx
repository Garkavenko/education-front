import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './styles.module.css';
import AuthForm from './Auth/AuthForm';
import App from './App';
import withAuth from '../hocs/withAuth';

const AppWithAuth = withAuth(App);
const AuthFormWithAuth = withAuth(AuthForm);

function Routes() {
  return (
    <div className={styles.container}>
      <Router>
        <div className={styles.container}>
          <Switch>
            <Route exact path="/auth" component={AuthFormWithAuth} />
            <Route path="/" component={AppWithAuth} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Routes;
