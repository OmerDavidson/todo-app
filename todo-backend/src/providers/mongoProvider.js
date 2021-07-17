import { MongoClient, ObjectId } from 'mongodb';
import BaseProvider from './BaseProvider';
import { mongo } from '../configuration';

export default class MongoProvider extends BaseProvider {
  constructor(userName, password) {
    super(userName, password);
    this.client = new MongoClient(mongo.connectionString);
  }

  async getTasks() {
    let result = [];
    try {
      await this.client.connect();
      const database = this.client.db(mongo.DB);
      const tasks = database.collection(mongo.tasksCollection);
      const query = { userName: this.userName };
      const cursor = await tasks.find(query);
      result = await cursor.toArray();
    } finally {
      await this.client.close();
    }
    return result;
  }

  async createTask(task) {
    try {
      await this.client.connect();
      const database = this.client.db(mongo.DB);
      const tasks = database.collection(mongo.tasksCollection);
      await tasks.insertOne({
        userName: this.userName,
        status: false,
        task,
      });
    } finally {
      await this.client.close();
    }
  }

  async changeTaskStatus(taskId, newStatus) {
    try {
      await this.client.connect();
      const database = this.client.db(mongo.DB);
      const tasks = database.collection(mongo.tasksCollection);
      const filters = { userName: this.userName, _id: ObjectId(taskId) };
      const updateDoc = {
        $set: {
          status: newStatus,
        },
      };
      await tasks.updateOne(filters, updateDoc);
    } finally {
      await this.client.close();
    }
  }

  async validatePassword() {
    let result = false;
    try {
      await this.client.connect();
      const database = this.client.db(mongo.DB);
      const users = database.collection(mongo.usersCollection);
      const res = await users.insertOne({
        userName: this.userName,
        password: this.password,
      });
      result = !!res;
    } finally {
      await this.client.close();
    }
    return result;
  }

  async checkIfUserExists() {
    let result = false;
    try {
      await this.client.connect();
      const database = this.client.db(mongo.DB);
      const users = database.collection(mongo.usersCollection);
      const res = await users.findOne({
        userName: this.userName,
      });
      result = !!res;
    } finally {
      await this.client.close();
    }
    return result;
  }

  async createNewUser() {
    try {
      await this.client.connect();
      const database = this.client.db(mongo.DB);
      const users = database.collection(mongo.usersCollection);
      await users.insertOne({
        userName: this.userName,
        password: this.password,
      });
    } finally {
      await this.client.close();
    }
  }
}
