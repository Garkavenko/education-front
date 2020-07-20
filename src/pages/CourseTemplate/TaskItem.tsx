import React, { useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';

interface TaskItemProps {
  id: number;
  name: string;
  checked?: boolean;
  onCheck: (id: number) => void;
}

function TaskItem({ id, name, checked, onCheck }: TaskItemProps) {
  const onClick = useCallback(() => {
    onCheck(id);
  }, [id, onCheck]);
  return (
    <ListItem onClick={onClick} button key={id}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default TaskItem;
