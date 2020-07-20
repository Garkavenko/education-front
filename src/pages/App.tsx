import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DescriptionIcon from '@material-ui/icons/Description';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router-dom';
import CourseTemplates from './CourseTemplates';
import CourseTemplate from './CourseTemplate';
import Task from './Task';
import Tasks from './Tasks';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const userInfo = useSelector((state: any) => state.user);
  console.log(userInfo, 'userInfo');
  const history = useHistory();
  const [, setCookie] = useCookies([]);
  const userExists = !!userInfo?.id;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h4>{'Система поддержки принятия решений'.toUpperCase()}</h4>
            {userExists && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>
                  { userInfo?.role?.name || ''}
                </span>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setCookie('AUTH_TOKEN', '', { path: '/' })}
                  style={{ marginLeft: 15 }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => history.push('/tasks-search')}>
              <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
              <ListItemText primary="Поиск задач" />
            </ListItem>
            {userInfo?.role?.alias === 'teacher' && (
              <ListItem button onClick={() => history.push('/course-template')}>
                <ListItemIcon><DescriptionIcon/></ListItemIcon>
                <ListItemText primary="Шаблоны КП (КР)"/>
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route path="/tasks-search" component={Tasks} />
          <Route path="/task/:id" component={Task} />
          {userInfo?.role?.alias === 'teacher' && <Route path="/course-template/:id" exact component={CourseTemplate}/>}
          {userInfo?.role?.alias === 'teacher' && <Route path="/course-template" exact component={CourseTemplates} />}
          <Redirect to="/tasks-search" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
