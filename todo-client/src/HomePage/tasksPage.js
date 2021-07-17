import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TaskSection from './TaskSection';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
const TasksPage = ({ userName, password }) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <TaskSection title="To Do" />
        <TaskSection title="Done" />
      </div>
    </Container>
  );
};

TasksPage.propTypes = {
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default TasksPage;
