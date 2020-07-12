import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Accordion from '../../views/Accordion';
import TaskInfo from '../../views/TaskInfo';
import useQuery from '../../hooks/useQuery';
import { API_URL } from '../../constants/environment';
import CircularProgress from '@material-ui/core/CircularProgress';

function Tasks() {
  const [task, setTask] = useState();
  const [state, fetch] = useQuery<any>(`${API_URL}/task-types`);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (state.loading || !state.data) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.rootContainer}>
        <div className={styles.accordionContainer}>
          <Accordion tasks={state.data} onClick={(task: any) => setTask(task)} />
        </div>
        <div className={styles.body}>
          {task && <TaskInfo key={task.id} task={task} />}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
