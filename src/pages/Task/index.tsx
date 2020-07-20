import React, { useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import { CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TaskInfo from '../../views/TaskInfo';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
}));


function Task() {
  const { id } = useParams();
  const [state, fetch] = useQuery('/task');
  const styles = useStyles();

  useEffect(() => {
    fetch({ params: { id } });
  }, [fetch, id]);

  if (state.loading || !state.loaded) {
    return (
      <CardContent className={styles.container}>
        <CircularProgress />
      </CardContent>
    );
  }

  if (state.error || !state.data) {
    return (
      <CardContent className={styles.container}>
        <h3>Произошла ошибка</h3>
      </CardContent>
    );
  }

  return (
    <Grow in>
      <TaskInfo task={state.data} />
    </Grow>
  );
}

export default Task;
