import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Tasks from './Tasks';
import styles from './styles.module.css';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Switch>
          <Route path="/">
            <Tasks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
