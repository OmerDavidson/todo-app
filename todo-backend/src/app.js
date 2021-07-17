import express from 'express';
import http2 from 'http2';
import ProviderFactory from './providers/ProviderFactory';
import { Providers } from './constants';
import authorize from './middlewares/authorize';

const app = express();
const port = 3000;
app.use(express.json());

app.use(authorize);

// get all tasks
app.post('/tasks', async (req, res) => {
  const { provider } = req.body;
  try {
    const tasks = await provider.getTasks();
    res.status(http2.constants.HTTP_STATUS_OK).send(tasks);
  } catch (e) {
    res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
  }
});

// post new task
app.post('/task', async (req, res) => {
  const { task, provider } = req.body;

  try {
    await provider.createTask(task);
    res
      .status(http2.constants.HTTP_STATUS_OK)
      .send('task created successfully!');
  } catch (e) {
    res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
  }
});

// change specific task
app.put('/task/:id', (req, res) => {
  const { status, provider } = req.body;
  const taskID = req.params.id;
  if (status === undefined || taskID === undefined) {
    res
      .status(http2.constants.HTTP_STATUS_BAD_REQUEST)
      .send('request must include both status and id');
  }
  try {
    provider.changeTaskStatus(taskID, status);
    res
      .status(http2.constants.HTTP_STATUS_OK)
      .send('status updated successfully');
  } catch (e) {
    res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
  }
});

// check if username exists
app.get('/user/:name', async (req, res) => {
  const provider = ProviderFactory(Providers.Mongo, req.params.name, '');
  try {
    const result = await provider.checkIfUserExists();
    res.status(http2.constants.HTTP_STATUS_OK).send(result);
  } catch (e) {
    res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send(false);
  }
});

// create new user
app.post('/user', async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res
      .status(http2.constants.HTTP_STATUS_BAD_REQUEST)
      .send('request body must include both "userName" and "password"');
  }

  const provider = ProviderFactory(Providers.Mongo, userName, password);
  if (await provider.checkIfUserExists()) {
    res.status(http2.constants.HTTP_STATUS_CONFLICT).send('user name taken');
  }

  try {
    await provider.createNewUser();
    res.status(http2.constants.HTTP_STATUS_OK).send('new user created');
  } catch (e) {
    res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(e);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
