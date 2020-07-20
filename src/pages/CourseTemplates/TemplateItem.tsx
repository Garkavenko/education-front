import React from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
}));

interface TemplateItemProps {
  id: number;
  name: string;
}

function TemplateItem({ id, name }: TemplateItemProps) {
  const history = useHistory();
  const styles = useStyles();
  return (
    <Paper className={styles.container}>
      <ListItem onClick={() => history.push(`/course-template/${id}`)} button key={id}>
        <ListItemText primary={name} />
      </ListItem>
    </Paper>
  );
}

export default TemplateItem;
