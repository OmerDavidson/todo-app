export const postgres = {
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DB || 'tasks',
  password: process.env.PG_PASSWORD || 'password',
  port: process.env.PG_PORT || 5432,
};

export const mongo = {
  connectionString:
    process.env.MONGO_CONNECTION_STRING ||
    'secret api key that yoy shouldn\'t uplaod to github!',
  DB: process.env.MONGO_DB || 'tasks',
  tasksCollection: process.env.MONGO_TASKS_COLLECTION || 'tasks',
  usersCollection: process.env.MONGO_USERS_COLLECTION || 'users',
};
