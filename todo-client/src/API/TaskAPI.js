import axios from 'axios';

export const getTasks = async (userName, password) =>
  axios.post('/tasks', {
    userName,
    password,
  });

export const createAccount = async (userName, password) =>
  axios.post('/user', {
    userName,
    password,
  });

export const logIn = async (userName, password) =>
      axios.post