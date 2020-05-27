import React, { useState } from 'react';
import './global.css';
import styles from './styles.module.css';
import {  AppBar } from "@material-ui/core";
import Accordion from "./components/Accordion";
import Toolbar from "@material-ui/core/Toolbar";
import Laboratory from "./components/Laboratory";

function App() {
    const [task, setTask] = useState();
  return (
    <div style={{ height: '100%', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          {'Система поддержки принятия решений'.toUpperCase()}
        </Toolbar>
      </AppBar>
        <div className={styles.rootContainer}>
            <div className={styles.accordionContainer}>
              <Accordion onClick={(task) => setTask(task)} />
            </div>

          <div className={styles.body}>
            {task && <Laboratory key={task.id} task={task} />}
          </div>
        </div>
    </div>
  );
}

export default App;
