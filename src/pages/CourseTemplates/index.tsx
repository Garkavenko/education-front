import React, { useCallback, useEffect, useRef } from 'react';
import SearchForm from './SearchForm';
import useQuery from '../../hooks/useQuery';
import { Paper } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import List from '@material-ui/core/List';
import Empty from '../../components/Empty';
import TemplateItem from './TemplateItem';
import Button from '@material-ui/core/Button';
import CreateModal from './CreateModal';
import useModalVisibilityState from '../../hooks/useModalVisibilityState';
import { debounceCall } from '../../utils';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  searchContainer: {
    marginTop: theme.spacing(2),
  },
  paper: {
    width: '100%',
  },
  createButton: {
    margin: `${theme.spacing(2)}px 0`,
    width: '100%',
  },
}));

function CourseTemplates() {
  const styles = useStyles();
  const [disciplines, fetchDisciplines] = useQuery<any>('/disciplines');
  const [seasons, fetchSeasons] = useQuery<any>('/all-seasons');
  const [templates, fetchTemplates] = useQuery<any>('/all-course-work-templates');
  const [visible, open, close] = useModalVisibilityState();
  const latestParams = useRef({});

  useEffect(() => {
    fetchDisciplines();
    fetchSeasons();
  }, [fetchDisciplines, fetchSeasons]);

  const onSearch = useCallback(
    (disciplineId: number | null, profileId: number | null, year: number | null, seasonId: number | null) => {
      debounceCall(() => {
        latestParams.current = { disciplineId, profileId, year, seasonId };
        fetchTemplates({ params: { disciplineId, profileId, year, seasonId } });
      });
    },
    [fetchTemplates],
  );

  function getName(template: any) {
    return [template?.discipline?.name, template?.disciplineProfile?.name, template?.year_number, template?.season?.name]
      .filter(i => !!i).join(' / ');
  }

  if (disciplines.loading || seasons.loading) {
    return (
      <CardContent className={styles.container}>
        <CircularProgress />
      </CardContent>
    );
  }

  return (
    <>
      <Grow in>
        <div className={styles.paper}>
          <Paper className={styles.container}>
            <CardContent>
              <SearchForm onSearch={onSearch} disciplines={disciplines.data || []} seasons={seasons.data || []} />
            </CardContent>
          </Paper>
          <div className={styles.createButton}>
            <Button variant="contained" color="primary" onClick={open}>Создать шаблон КП (КР)</Button>
          </div>
          <div className={styles.searchContainer}>
            {(templates.loading) && (
              <CircularProgress />
            )}
            {
              Array.isArray(templates.data) && (
                <Grow in>
                  <div className={styles.paper}>
                    { templates.data.length ? (
                      <List>
                        {templates.data.map(template => (
                          <TemplateItem key={template.id} id={template.id} name={getName(template)} />
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
      </Grow>
      <CreateModal seasons={seasons.data || []} disciplines={disciplines.data || []} isVisible={visible} onClose={close} />
    </>
  );
}


export default CourseTemplates;
