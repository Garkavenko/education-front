import React from 'react';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './styles.module.css';
import AuthForm from '../views/AuthForm';
import App from './App';

function Routes() {
  return (
    <div className={styles.container}>
      <AppBar position="static">
        <Toolbar>
          <h4>{'Система поддержки принятия решений'.toUpperCase()}</h4>
        </Toolbar>
      </AppBar>
      <Router>
        <div className={styles.container}>
          <Switch>
            <Route path="/auth">
              <AuthForm />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Routes;
