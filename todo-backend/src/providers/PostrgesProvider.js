import { Client } from 'pg';
import _ from 'lodash';
import BaseProvider from './BaseProvider';
import { postgres } from '../configuration';

export default class PostgresProvider extends BaseProvider {
  constructor(userName, password) {
    super(userName, password);
    this.client = new Client(postgres);
    this.client.connect();
  }

  async getTasks() {
    const query =
      'SELECT tasks.id,task,status FROM tasks INNER JOIN users on tasks.user_id=users.id WHERE users.user_name=$1 AND users.password=$2';
    const values = [this.userName, this.password];
    const result = await this.client.query(query, values);
    return _.get(result, 'rows', []);
  }

  async createTask(task) {
    if (this.userID === -1) {
      throw new Error('password never validated');
    }
    const query = 'INSERT INTO tasks (user_id,task,status) VALUES($1,$2,false)';
    const values = [this.userID, task];
    return this.client.query(query, values);
  }

  async changeTaskStatus(taskId, newStatus) {
    const query = 'UPDATE tasks SET status = $1 WHERE id = $2';
    const values = [newStatus, taskId];
    await this.client.query(query, values);
  }

  async checkIfUserExists() {
    const query = 'SELECT user_name FROM users WHERE user_name=$1';
    const values = [this.userName];
    const result = await this.client.query(query, values);
    return result.rows.length > 0;
  }

  async createNewUser() {
    const query = 'INSERT INTO users (user_name,password) VALUES($1,$2)';
    const values = [this.userName, this.password];
    await this.client.query(query, values);
  }

  async validatePassword() {
    const query = 'SELECT id from users where user_name = $1 and password = $2';
    const values = [this.userName, this.password];
    const result = await this.client.query(query, values);
    const userID = _.get(result, 'rows[0].id', -1);
    this.userID = userID;
    return result.rows.length > 0;
  }
}
