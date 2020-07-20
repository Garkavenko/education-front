import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import useQuery from '../../hooks/useQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Empty from '../../components/Empty';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import TaskItem from './TaskItem';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(2),
  },
  paper: {
    width: '80%',
  },
}));

interface TasksSearchProps {
  onChooseTask?: (id: number) => void;
  listContainerClassName?: string;
}


function TasksSearch({ onChooseTask, listContainerClassName }: TasksSearchProps) {
  const classes = useStyles();
  const [state, fetch] = useQuery('/tasks-search');
  const [search, setSearch] = useState('');
  const onClickItem = useCallback((id: number) => {
    onChooseTask && onChooseTask(id);
  }, [onChooseTask]);

  useEffect(() => {
    fetch({ params: { search: '' } });
  }, [fetch]);

  return (
    <div className={classes.container}>
      <Paper component="form" onSubmit={(event) => {
        event.preventDefault();
        fetch({ params: { search: search } });
      }} className={classes.root}>
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          autoFocus
          value={search}
          onChange={event => setSearch(event.target.value)}
          className={classes.input}
          placeholder="Поиск задачи..."
        />
      </Paper>
      <div className={classes.content}>
        {(state.loading) && (
          <CircularProgress />
        )}
        {
          Array.isArray(state.data) && (
            <Grow in>
              <div className={cx(classes.paper, listContainerClassName)}>
                { state.data.length ? (
                  <List>
                    {state.data.map(task => (
                      <TaskItem onPress={onClickItem} key={task.id} name={task.name} id={task.id} />
                    ))}
                  </List>
                ) : (
                  <Paper>
                    <CardContent>
                      <Empty />
                    </CardContent>
                  </Paper>
                )}
              </div>
            </Grow>
          )
        }
      </div>
    </div>
  );
}

export default TasksSearch;
