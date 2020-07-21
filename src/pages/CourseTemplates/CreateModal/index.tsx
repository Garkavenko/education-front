import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import SearchForm from '../SearchForm';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardContent from '@material-ui/core/CardContent';
import useQuery from '../../../hooks/useQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';

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
}));

interface CreateModalProps {
  isVisible: boolean;
  onClose: () => void;
  disciplines: any[];
  seasons: any[];
}

function CreateModal({ isVisible, onClose, disciplines, seasons }: CreateModalProps) {
  const styles = useStyles();
  const history = useHistory();
  const [params, setParams] = useState<Record<string, number | null>>({});
  const [state, fetch] = useQuery<any>('/create-course-work-template', { method: 'post' });

  function isParamsPassed() {
    if (!params) return false;
    return Object.keys(params).length > 0 && Object.keys(params).every(k => !!params[k]);
  }

  const onSearch = useCallback(
    (disciplineId: number | null, profileId: number | null, year: number | null, seasonId: number | null) => {
      setParams({ disciplineId, profileId, year, seasonId });
    },
    [],
  );

  const onCreate = useCallback( async () => {
    try {
      const res = await fetch({ data: params });
      history.push(`/course-template/${res.id}`);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }, [fetch, history, params]);

  return (
    <Dialog open={isVisible} onClose={onClose}>
      <CardContent>
        <div className={styles.container}>
          <SearchForm direction="column" disciplines={disciplines} seasons={seasons} onSearch={onSearch} />
          <Button
            disabled={!isParamsPassed() || state.loading}
            className={styles.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={onCreate}
          >
            {
              (state.loading) ? (
                <CircularProgress size={24} />
              ) : (
                'Создать'
              )
            }
          </Button>
          {!!state.error && (
            <Alert
              severity="error"
              className={styles.alert}
            >
              {state.error?.message || 'Произошла ошибка'}
            </Alert>
          )}
        </div>
      </CardContent>
    </Dialog>
  );
}

export default CreateModal;
