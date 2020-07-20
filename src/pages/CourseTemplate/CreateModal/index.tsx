import React from 'react';
import { Dialog } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardContent from '@material-ui/core/CardContent';
import TasksSearch from '../../../views/TasksSearch';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(10)}px`,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  searchList: {
    width: '100%',
  },
  dialog: {
    width: 600,
    height: 400,
  },
}));

interface CreateModalProps {
  isVisible: boolean;
  onClose: () => void;
  onChooseTask: (id: number) => void;
}

function CreateModal({ isVisible, onClose, onChooseTask }: CreateModalProps) {
  const styles = useStyles();

  return (
    <Dialog open={isVisible} onClose={onClose}>
      <CardContent className={styles.dialog}>
        <div className={styles.container}>
          <TasksSearch onChooseTask={onChooseTask} listContainerClassName={styles.searchList} />
        </div>
      </CardContent>
    </Dialog>
  );
}

export default CreateModal;
