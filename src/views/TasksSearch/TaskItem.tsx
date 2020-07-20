import React, { useCallback } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
  },
}));

interface TaskItemProps {
  name: string;
  id: number;
  onPress?: (id: number) => void;
}

function TaskItem({ name, id, onPress }: TaskItemProps) {
  const styles = useStyles();
  const onClick = useCallback(() => {
    onPress && onPress(id);
  }, [id, onPress]);
  return (
    <Paper className={styles.container}>
      <ListItem onClick={onClick} button key={id}>
        <ListItemText primary={name} />
      </ListItem>
    </Paper>
  );
}

export default TaskItem;
