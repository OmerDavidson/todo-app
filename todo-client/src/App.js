import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './login/signIn';
import TasksPage from './HomePage/tasksPage';

const App = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/home">
            <TasksPage userName={userName} password={password} />
          </Route>
          <Route path="/">
            <SignIn setUserName={setUserName} setPassword={setPassword} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
