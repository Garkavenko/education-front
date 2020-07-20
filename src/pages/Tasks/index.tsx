import React from 'react';
import { useHistory } from 'react-router-dom';
import TasksSearch from '../../views/TasksSearch';

function Tasks() {
  const history = useHistory();
  return <TasksSearch onChooseTask={(id) => history.push(`/task/${id}`)} />;
}

export default Tasks;
