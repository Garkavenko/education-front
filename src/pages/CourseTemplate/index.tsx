import React, { useEffect } from 'react';
import {
  useParams, Redirect,
} from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Tasks from './Tasks';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  breadItem: {
    ...theme.typography.subtitle1,
    color: theme.palette.grey['700'],
  },
  header: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  buttonProgress: {
    marginRight: theme.spacing(1),
  },
}));

function CourseTemplate() {
  const { id } = useParams();
  const [state, fetch] = useQuery<any>('/course-work');
  const [removeState, fetchRemove] = useQuery<any>('/remove-course-work-template', { data: { id }, method: 'post' });
  const styles = useStyles();

  useEffect(() => {
    fetch({ params: { id } });
  }, [fetch, id]);

  if (removeState.loaded && !removeState.error) {
    return <Redirect to="/course-template" />;
  }

  if ((state.loaded && !state.data) || state.error) {
    return (
      <div className={styles.container}>
        <h3>Произошла ошибка</h3>
      </div>
    );
  }

  if (state.loading || !state.loaded) {
    return (
      <CardContent className={styles.container}>
        <CircularProgress />
      </CardContent>
    );
  }

  function getNameArray() {
    return [
      state.data?.discipline?.name,
      state.data?.disciplineProfile?.name,
      state.data?.year_number,
      state.data?.season?.name,
    ].filter(i => !!i);
  }

  return (
    <>
      <div className={styles.container}>
        <Grow in>
          <div style={{ width: '100%' }}>
            <div className={styles.header}>
              <Breadcrumbs aria-label="breadcrumb">
                {getNameArray().map((e, i) => <span className={styles.breadItem} key={i}>{e}</span>)}
              </Breadcrumbs>
              <Button onClick={async () => {
                try {
                  !removeState.loading && await fetchRemove();
                  toast('Удалено');
                  // eslint-disable-next-line no-empty
                } catch (e) {}
              }} color="secondary" variant="outlined">
                {removeState.loading && (
                  <CircularProgress
                    className={styles.buttonProgress}
                    size={20}
                    color="inherit"
                  />
                )} Удалить
              </Button>
            </div>
            <Divider className={styles.divider} />
          </div>
        </Grow>
        {
          Array.isArray(state.data?.taskList) && (
            <Tasks templateId={id} tasks={state.data?.taskList} />
          )
        }
      </div>
    </>
  );
}

export default CourseTemplate;
