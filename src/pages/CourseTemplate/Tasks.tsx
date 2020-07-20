import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import List from '@material-ui/core/List';
import { CardContent } from '@material-ui/core';
import Empty from '../../components/Empty';
import Grow from '@material-ui/core/Grow';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import TaskItem from './TaskItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CreateModal from './CreateModal';
import useModalVisibilityState from '../../hooks/useModalVisibilityState';
import useQuery from '../../hooks/useQuery';
import CircularProgress from '@material-ui/core/CircularProgress';

interface TasksProps {
  tasks: any[];
  templateId: number;
}

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
  },
  addBlock: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  tasksHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    margin: `0 ${-theme.spacing(1)}px`,
  },
  headerItem: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  blockTitle: {
    ...theme.typography.subtitle1,
    color: theme.palette.grey['700'],
    fontSize: 18,
  },
}));

function Tasks({ tasks, templateId }: TasksProps) {
  const styles = useStyles();
  const [innerTasks, setInnerTasks] = useState(tasks);
  const [isVisible, open, close] = useModalVisibilityState();
  const [addState, fetchAdd] = useQuery('/add-task-to-template', { method: 'post' });
  const [newTaskState, fetchNewTask] = useQuery('/task', { method: 'get' });
  const [deleteTaskState, fetchDeleteTask] = useQuery('/remove-tasks-from-template', { method: 'post' });
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  const onCheckTask = useCallback((id: number) => {
    setCheckedTasks(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      return [...prev, id];
    });
  }, []);

  const onAddTask = useCallback(async (id: number) => {
    close();
    if (innerTasks.some(t => t.id === id)) return;
    try {
      await fetchAdd({ data: { taskId: id, templateId } });
      const task = await fetchNewTask({ params: { id } });
      setInnerTasks(prev => [...prev, task]);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }, [close, fetchAdd, fetchNewTask, innerTasks, templateId]);

  const onDeleteTask = useCallback(async () => {
    try {
      await fetchDeleteTask({ data: { taskIds: checkedTasks, templateId } });
      setInnerTasks(prev => prev.filter(p => !checkedTasks.includes(p.id)));
      setCheckedTasks([]);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }, [checkedTasks, fetchDeleteTask, templateId]);

  useEffect(() => {
    setInnerTasks([...tasks]);
  }, [tasks]);

  return (
    <>
      <CreateModal onChooseTask={onAddTask} isVisible={isVisible} onClose={close} />
      <Grow in>
        <div className={styles.paper}>
          <div className={styles.tasksHeader}>
            <div className={styles.headerItem}>
              <span className={styles.blockTitle}>Задачи</span>
            </div>
            <div className={styles.headerItem}>
              <Fab
                size="small"
                color="primary"
                onClick={open}
              >
                {addState.loading || newTaskState.loading ? <CircularProgress color="inherit" size={20} /> : <AddIcon />}
              </Fab>
            </div>
            <div className={styles.headerItem}>
              <Fab onClick={onDeleteTask} size="small" color="secondary">
                {deleteTaskState.loading ? <CircularProgress color="inherit" size={20} /> : <DeleteIcon/>}
              </Fab>
            </div>
          </div>
          <div className={styles.paper}>
            { innerTasks?.length ? (
              <Paper>
                <List className={cx(styles.list, styles.addBlock)}>
                  {innerTasks.map((task: any) => (
                    <TaskItem
                      onCheck={onCheckTask}
                      checked={checkedTasks.includes(task.id)}
                      key={task.id}
                      id={task.id}
                      name={task.name}
                    />
                  ))}
                </List>
              </Paper>
            ) : (
              <Paper className={styles.addBlock}>
                <CardContent>
                  <Empty />
                </CardContent>
              </Paper>
            )}
          </div>
        </div>
      </Grow>
    </>
  );
}

export default React.memo(Tasks, isEqual);
