import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InboxIcon from '@material-ui/icons/Inbox';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'gray',
  },
  icon: {
    height: 50,
    width: 50,
  },
}));

function Empty() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <InboxIcon className={styles.icon} />
      <div>
        Нет данных
      </div>
    </div>
  );
}

export default Empty;
