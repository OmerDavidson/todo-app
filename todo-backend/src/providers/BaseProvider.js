export default class BaseProvider {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
    this.userID = -1;
  }

  async getTasks() {}

  async createTask(task) {}

  async changeTaskStatus(taskId, newStatus) {}

  async checkIfUserExists() {}

  async createNewUser() { }
  
  async validatePassword() { }
}
